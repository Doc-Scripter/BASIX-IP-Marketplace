from flask import Flask, request, jsonify, render_template, send_from_directory
from blockchain import mint_nft, transfer_ownership, get_ownership_on_chain
from metta_integration import update_metta_ownership, get_metta_ownership
from config import Config
from models import db, User # Import db and User from models.py

app = Flask(__name__, static_folder='../frontend/build', static_url_path='/')
app.config.from_object(Config)
db.init_app(app) # Initialize SQLAlchemy with the app

# Create database tables if they don't exist
with app.app_context():
    db.create_all()

@app.route('/')
def serve_react_app():
    return send_from_directory(app.static_folder, 'index.html')

# Route to serve static files (like your homepage, registration, login pages)
# Assuming these are HTML files that will be placed in a 'templates' folder
@app.route('/<path:filename>')
def serve_static(filename):
    return send_from_directory('templates', filename)

# Example route for minting an NFT (conceptual)
@app.route('/mint-nft', methods=['POST'])
def mint_nft_route():
    data = request.get_json()
    owner = data.get('owner')
    token_id = data.get('token_id')

    if not owner or not token_id:
        return jsonify({"error": "Owner and token_id are required"}), 400

    try:
        # Call blockchain function to mint NFT
        transaction_hash = mint_nft(owner, token_id)
        # Update MeTTa knowledge base
        update_metta_ownership(token_id, owner)
        return jsonify({"message": "NFT minted successfully", "transaction_hash": transaction_hash}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Add a catch-all route for client-side routing (important for React Router)
@app.route('/<path:path>')
def serve_static_files(path):
    if path != "" and os.path.exists(os.path.join(app.static_folder, path)):
        return send_from_directory(app.static_folder, path)
    else:
        return send_from_directory(app.static_folder, 'index.html')

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)