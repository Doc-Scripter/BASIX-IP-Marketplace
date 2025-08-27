import os
from datetime import datetime, timedelta
from blockfrost import BlockFrostApi, ApiError, ApiUrls
from pycardano import (
    BlockFrostChainContext,
    Network,
    PaymentSigningKey,
    PaymentVerificationKey,
    Address,
    TransactionBuilder,
    TransactionOutput,
    Transaction,
    TransactionBody,
    TransactionWitnessSet,
    AuxiliaryData,
    Metadata,
    ScriptPubkey,
    NativeScript,
    AssetName,
    MultiAsset,
    Value,
    min_lovelace,  # ← changed earlier
)
from dotenv import load_dotenv

load_dotenv()

BLOCKFROST_PROJECT_ID = os.getenv("BLOCKFROST_PROJECT_ID")
SENDER_ADDRESS = os.getenv("SENDER_ADDRESS")
SENDER_SK_HEX = os.getenv("SENDER_SK_HEX")  # hex of signing key (or path)
NETWORK = os.getenv("NETWORK", "testnet")

if not BLOCKFROST_PROJECT_ID or not SENDER_ADDRESS or not SENDER_SK_HEX:
    raise RuntimeError("Set BLOCKFROST_PROJECT_ID, SENDER_ADDRESS and SENDER_SK_HEX in .env")

# Blockfrost API + pycardano chain context
if NETWORK == "mainnet":
    api = BlockFrostApi(project_id=BLOCKFROST_PROJECT_ID, base_url=ApiUrls.mainnet.value)
    chain_context = BlockFrostChainContext(BLOCKFROST_PROJECT_ID, network=Network.MAINNET)
else:  # default to testnet
    api = BlockFrostApi(project_id=BLOCKFROST_PROJECT_ID, base_url=ApiUrls.testnet.value)
    chain_context = BlockFrostChainContext(BLOCKFROST_PROJECT_ID, network=Network.TESTNET)

# Helper: load signing key from hex string (expect 64/96/whatever hex)
def load_signing_key_from_hex(hex_str):
    return PaymentSigningKey.from_bytes(bytes.fromhex(hex_str))

# Create a simple key-locked native script policy (private key)
def create_policy_from_signing_key(skey: PaymentSigningKey):
    vkey = PaymentVerificationKey.from_signing_key(skey)
    pubkey_hash = vkey.hash()
    script = ScriptPubkey(pubkey_hash)
    native_script = NativeScript(script)
    policy_id = native_script.hash()
    return native_script, policy_id

# Mint a single NFT with metadata (on testnet)
def mint_nft(nft_name: str, metadata: dict, recipient_address: str, skey_hex: str):
    skey = load_signing_key_from_hex(skey_hex)
    native_script, policy_id = create_policy_from_signing_key(skey)
    policy_id_hex = policy_id.payload.hex()

    asset_name = AssetName(nft_name.encode('utf-8'))
    ma = MultiAsset()
    ma[policy_id] = {asset_name: 1}

    cip25 = {
        721: {
            policy_id_hex: {
                nft_name: metadata
            }
        }
    }

    context = chain_context
    tx_builder = TransactionBuilder(context)

    out_value = Value(0)
    out_value.multi_asset = ma
    min_love = min_lovelace(Value(1_000_000, ma))  # ← changed earlier
    out = TransactionOutput(Address.from_primitive(recipient_address), Value(min_love, ma))
    tx_builder.add_output(out)

    # new metadata handling
    tx_builder.auxiliary_data = AuxiliaryData(metadata=Metadata(cip25))

    tx_builder.add_minting_script(native_script)
    tx_builder.mint = ma

    tx = tx_builder.build_and_sign([skey], change_address=Address.from_primitive(SENDER_ADDRESS))
    tx_id = context.submit_tx(tx.to_cbor())
    return {"tx_id": tx_id, "policy_id": policy_id_hex, "asset": f"{policy_id_hex}.{nft_name}"}

# Mint fractional token
def mint_fractional_token(nft_base_name: str, fraction_token_name: str, quantity: int, recipient: str, skey_hex: str):
    skey = load_signing_key_from_hex(skey_hex)
    native_script, policy_id = create_policy_from_signing_key(skey)
    policy_id_hex = policy_id.payload.hex()
    asset_name = AssetName(fraction_token_name.encode('utf-8'))

    ma = MultiAsset()
    ma[policy_id] = {asset_name: quantity}

    tx_builder = TransactionBuilder(chain_context)
    min_love = min_lovelace(Value(1_000_000, ma))  # ← changed earlier
    out = TransactionOutput(Address.from_primitive(recipient), Value(min_love, ma))
    tx_builder.add_output(out)
    tx_builder.add_minting_script(native_script)
    tx_builder.mint = ma

    #  new metadata handling
    tx_builder.auxiliary_data = AuxiliaryData(metadata=Metadata({
        721: {
            policy_id_hex: {
                fraction_token_name: {"name": fraction_token_name, "parent": nft_base_name}
            }
        }
    }))

    tx = tx_builder.build_and_sign([skey], change_address=Address.from_primitive(SENDER_ADDRESS))
    tx_id = chain_context.submit_tx(tx.to_cbor())
    return {
        "tx_id": tx_id,
        "policy_id": policy_id_hex,
        "asset": f"{policy_id_hex}.{fraction_token_name}",
        "quantity": quantity
    }

# Send a small ADA payment
def send_payment(to_address: str, amount_lovelace: int, skey_hex: str):
    skey = load_signing_key_from_hex(skey_hex)
    payment_vkey = PaymentVerificationKey.from_signing_key(skey)
    tx_builder = TransactionBuilder(chain_context)
    tx_builder.add_output(TransactionOutput(Address.from_primitive(to_address), Value(amount_lovelace)))
    tx = tx_builder.build_and_sign([skey], change_address=Address.from_primitive(SENDER_ADDRESS))
    tx_id = chain_context.submit_tx(tx.to_cbor())
    return {"tx_id": tx_id}
