from flask import Flask, request, jsonify
import re
from datetime import datetime
import subprocess

# --- NEW: Cardano integration imports ---
from cardano_integration import mint_fractional_token, mint_nft, send_payment

app = Flask(__name__)

# --- Global ownership + history tracker (in-memory for now) ---
ownership_history = {}  # { nft_id: [ {owner, fraction, timestamp, action, amount} ] }
reputation_scores = {}  # { owner: score }
provenance_log = {}     # { nft_id: [ {event, owner, timestamp} ] }


#  Parser to load KB from marketplace.metta 
def load_kb(filename="marketplace.metta"):
    creators = {}
    products = {}
    nfts = {}
    funding_thresholds = {}

    with open(filename, "r") as f:
        for line in f:
            line = line.strip()
            if not line or line.startswith(";"):  
                continue

            m = re.match(r"\((\w+)\s+([\w\d_]+)\s*(.*)\)", line)
            if not m:
                continue

            entity_type, entity_name, rest = m.groups()

            # Special handling for FundingThreshold
            if entity_type == "FundingThreshold":
                try:
                    funding_thresholds[entity_name] = int(rest.strip())
                except ValueError:
                    funding_thresholds[entity_name] = None
                continue

            tokens = rest.split()
            data = {}
            i = 0
            while i < len(tokens):
                key = tokens[i]
                if i + 1 < len(tokens):
                    val = tokens[i + 1]
                    # clean brackets/quotes
                    val = val.strip('"').replace('[', '').replace(']', '')
                    if "," in val:
                        val = [v.strip() for v in val.split(",")]
                    data[key] = val
                i += 2

            if entity_type == "Creator":
                creators[entity_name] = data
            elif entity_type == "Product":
                products[entity_name] = data
            elif entity_type == "NFT":
                nfts[entity_name] = data

    return creators, products, nfts, funding_thresholds


# === Load KB (instead of hardcoded dicts) ===
creators, products, nfts, funding_thresholds = load_kb("marketplace.metta")


# === Helper Functions ===
def append_history(nft_id, action, actor, fraction=0, amount=0):
    ownership_history.setdefault(nft_id, []).append({
        "actor": actor,
        "action": action,
        "fraction": fraction,
        "amount": amount,
        "timestamp": datetime.utcnow().isoformat()
    })

def impact_score(nft_id):
    """Impact score = contributions + reputation of contributors"""
    total = 0
    if nft_id in ownership_history:
        for event in ownership_history[nft_id]:
            actor = event["actor"]
            total += reputation_scores.get(actor, 0)
    return total


# === Routes ===
@app.route("/")
def home():
    return "🎉 Marketplace Backend is running! Try /api/creators or /api/nft/NFT_MaasaiNecklace"

@app.route("/api/nft/<nft_id>", methods=["GET"])
def get_nft(nft_id):
    nft = nfts.get(nft_id)
    if not nft:
        return jsonify({"error": "NFT not found"}), 404

    product_id = nft.get("links") if isinstance(nft, dict) else None
    product = products.get(product_id, {}) if product_id else {}

    funding = funding_thresholds.get(nft_id)
    history = ownership_history.get(nft_id, [])
    provenance = provenance_log.get(nft_id, [])
    return jsonify({
        "nft": nft_id,
        "product": product,
        "utilities": nft.get("utilities", []),
        "ownership": nft.get("ownership", {}),
        "funding_threshold": funding,
        "history": history,
        "provenance": provenance
    })

@app.route("/api/products/<creator>", methods=["GET"])
def get_products_by_creator(creator):
    owned = []
    for nft_id, nft in nfts.items():
        owners = nft.get("ownership", {})
        if creator in owners:
            owned.append({
                "nft": nft_id,
                "product": products.get(nft.get("links")),
                "utilities": nft.get("utilities", []),
                "ownership": owners
            })
    return jsonify({"creator": creator, "assets": owned})

@app.route("/api/creators", methods=["GET"])
def list_creators():
    return jsonify(creators)

@app.route("/api/funding/<nft_id>", methods=["GET"])
def get_funding(nft_id):
    amount = funding_thresholds.get(nft_id)
    if not amount:
        return jsonify({"error": "NFT not found"}), 404
    return jsonify({"nft": nft_id, "funding_threshold": amount})


# === Fractional ownership + history + reputation ===
@app.route("/api/ownership/<nft_id>", methods=["POST"])
def update_ownership(nft_id):
    data = request.json
    owner = data.get("owner")
    fraction = float(data.get("fraction", 0))

    if not owner or fraction <= 0:
        return jsonify({"error": "Invalid ownership update"}), 400

    nft = nfts.get(nft_id)
    if not nft:
        return jsonify({"error": "NFT not found"}), 404

    # Update ownership
    if "ownership" not in nft:
        nft["ownership"] = {}
    nft["ownership"][owner] = nft["ownership"].get(owner, 0) + fraction

    # Save history
    record = {
        "owner": owner,
        "fraction": fraction,
        "timestamp": datetime.utcnow().isoformat(),
        "action": "acquired"
    }
    ownership_history.setdefault(nft_id, []).append(record)

    # Save provenance
    prov_event = {
        "event": "Ownership updated",
        "owner": owner,
        "timestamp": datetime.utcnow().isoformat()
    }
    provenance_log.setdefault(nft_id, []).append(prov_event)

    # Reputation score bump
    reputation_scores[owner] = reputation_scores.get(owner, 0) + 1

    return jsonify({"status": "✅ Ownership updated", "nft": nft_id, "ownership": nft["ownership"]})


# === Contribution endpoint (funding → ownership → provenance + Cardano) ===
@app.route("/api/contribute/<nft_id>", methods=["POST"])
def contribute(nft_id):
    data = request.get_json()
    contributor = data.get("contributor")
    amount = float(data.get("amount", 0))
    contributor_address = data.get("cardano_address")  # contributor’s Cardano testnet address

    if not contributor or amount <= 0:
        return jsonify({"error": "Invalid contribution"}), 400

    nft = nfts.get(nft_id)
    if not nft:
        return jsonify({"error": "NFT not found"}), 404

    # Funding target
    funding_target = funding_thresholds.get(nft_id, 0)
    if funding_target <= 0:
        return jsonify({"error": "Funding threshold not set for this NFT"}), 400

    # Convert contribution to fractional ownership
    fraction = amount / funding_target

    # Update ownership
    if "ownership" not in nft:
        nft["ownership"] = {}
    nft["ownership"][contributor] = nft["ownership"].get(contributor, 0) + fraction

    # Save ownership history
    append_history(nft_id, "contributed", contributor, fraction, amount)

    # Save provenance
    provenance_log.setdefault(nft_id, []).append({
        "event": f"Contribution of {amount} ({fraction:.2%})",
        "owner": contributor,
        "timestamp": datetime.utcnow().isoformat()
    })

    # Reputation bump
    reputation_scores[contributor] = reputation_scores.get(contributor, 0) + 1

    # Calculate total fraction so far
    total_fraction = sum(nft["ownership"].values())
    status = "✅ Fully funded" if total_fraction >= 1 else "⏳ Still raising"

    # === NEW: Cardano fractional token minting ===
    frac_token_name = f"{nft_id}_SHARE".replace(" ", "_")
    quantity = int(fraction * 10000)
    if quantity < 1:
        quantity = 1

    try:
        mint_result = mint_fractional_token(
            nft_base_name=nft_id,
            fraction_token_name=frac_token_name,
            quantity=quantity,
            recipient=contributor_address,   # contributor’s testnet address
            skey_hex="YOUR_SKEY_HEX"         # ⚠️ load securely from env/.vault
        )
        provenance_log.setdefault(nft_id, []).append({
            "event": "mint_fractional_token",
            "details": mint_result,
            "timestamp": datetime.utcnow().isoformat()
        })
    except Exception as e:
        provenance_log.setdefault(nft_id, []).append({
            "event": "mint_error",
            "error": str(e),
            "timestamp": datetime.utcnow().isoformat()
        })

    return jsonify({
        "status": status,
        "nft": nft_id,
        "contributor": contributor,
        "amount": amount,
        "fraction_acquired": fraction,
        "total_fraction": total_fraction,
        "ownership": nft["ownership"],
        "history": ownership_history[nft_id]
    })


@app.route("/api/reputation/<owner>", methods=["GET"])
def get_reputation(owner):
    score = reputation_scores.get(owner, 0)
    return jsonify({"owner": owner, "reputation": score})


@app.route("/api/utility/<nft_id>/<owner>", methods=["GET"])
def check_utility_access(nft_id, owner):
    nft = nfts.get(nft_id)
    if not nft:
        return jsonify({"error": "NFT not found"}), 404

    ownership = nft.get("ownership", {})
    if owner not in ownership:
        return jsonify({"error": "Owner does not hold this NFT"}), 403

    utilities = nft.get("utilities", [])
    return jsonify({"nft": nft_id, "owner": owner, "utilities": utilities})


# === Extended Query Endpoints ===
@app.route("/api/ownership/<nft_id>", methods=["GET"])
def get_ownership_info(nft_id):
    nft = nfts.get(nft_id)
    if not nft:
        return jsonify({"error": "NFT not found"}), 404
    return jsonify({
        "nft": nft_id,
        "ownership": nft.get("ownership", {}),
        "history": ownership_history.get(nft_id, []),
        "provenance": provenance_log.get(nft_id, [])
    })

@app.route("/api/utilities/<nft_id>", methods=["GET"])
def list_utilities(nft_id):
    nft = nfts.get(nft_id)
    if not nft:
        return jsonify({"error": "NFT not found"}), 404
    return jsonify({
        "nft": nft_id,
        "utilities": nft.get("utilities", [])
    })

@app.route("/api/funding/<nft_id>/threshold", methods=["GET"])
def get_funding_threshold(nft_id):
    amount = funding_thresholds.get(nft_id)
    if amount is None:
        return jsonify({"error": "Funding threshold not defined"}), 404
    return jsonify({"nft": nft_id, "funding_threshold": amount})

@app.route("/api/reputation", methods=["GET"])
def list_reputation_scores():
    return jsonify(reputation_scores)

@app.route("/api/summary/<nft_id>", methods=["GET"])
def nft_summary(nft_id):
    nft = nfts.get(nft_id)
    if not nft:
        return jsonify({"error": "NFT not found"}), 404
    return jsonify({
        "nft": nft_id,
        "product": products.get(nft.get("links")),
        "ownership": nft.get("ownership", {}),
        "funding_threshold": funding_thresholds.get(nft_id),
        "utilities": nft.get("utilities", []),
        "history": ownership_history.get(nft_id, []),
        "provenance": provenance_log.get(nft_id, [])
    })


# === MeTTa-powered reasoning endpoint ===
@app.route("/api/reason/funding/<nft_id>", methods=["GET"])
def reason_funding(nft_id):
    nft = nfts.get(nft_id)
    if not nft:
        return jsonify({"error": "NFT not found"}), 404
    
    owners = nft.get("ownership", {})
    total_fraction = sum(owners.values())
    funding_target = funding_thresholds.get(nft_id, 0)

    status = "✅ Fully funded" if total_fraction >= 1 else "⏳ Still raising"

    return jsonify({
        "nft": nft_id,
        "total_fraction": total_fraction,
        "funding_threshold": funding_target,
        "status": status,
        "impact_score": impact_score(nft_id),
        "ownership": owners,
        "contributions": ownership_history.get(nft_id, [])
    })


# === Provenance & Audit ===
@app.route("/api/provenance/<nft_id>", methods=["GET"])
def get_provenance(nft_id):
    return jsonify({
        "nft": nft_id,
        "provenance": provenance_log.get(nft_id, [])
    })

@app.route("/api/audit", methods=["GET"])
def audit_log():
    return jsonify({
        "ownership_history": ownership_history,
        "provenance_log": provenance_log
    })


# === Cardano integration test endpoint ===
@app.route("/api/cardano/tx", methods=["POST"])
def cardano_tx():
    data = request.json
    nft_id = data.get("nft_id")
    owner = data.get("owner")
    fraction = data.get("fraction", 0)
    address = data.get("cardano_address")

    # Try mint test token
    try:
        result = mint_fractional_token(
            nft_base_name=nft_id,
            fraction_token_name=f"{nft_id}_TEST",
            quantity=int(fraction * 10000) or 1,
            recipient=address,
            skey_hex="YOUR_SKEY_HEX"
        )
        return jsonify({"status": "✅ Cardano TX minted", "result": result})
    except Exception as e:
        return jsonify({"status": "❌ Cardano TX failed", "error": str(e)}), 500


# === Reload KB Endpoint ===
@app.route("/api/reload", methods=["POST"])
def reload_kb():
    global creators, products, nfts, funding_thresholds
    try:
        creators, products, nfts, funding_thresholds = load_kb("marketplace.metta")
        return jsonify({"status": "✅ KB reloaded successfully"})
    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    app.run(debug=True)
