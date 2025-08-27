import sys
import os

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import create_access_token, jwt_required, JWTManager, get_jwt_identity
import os
from config import Config
from models import db, User, Asset # Import Asset model
from kb.kb_loader import load_marketplace_data



app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "*", "methods": ["GET", "POST", "PUT", "DELETE", "OPTIONS"], "allow_headers": ["Content-Type", "Authorization"]}})
app.config.from_object(Config)
db.init_app(app)



# Initialize Flask-JWT-Extended
jwt = JWTManager(app)



# Create database tables if they don't exist
with app.app_context():
    db.create_all()
    # Check if the database file exists, if not, create it
    if not os.path.exists('database.db'):
        db.create_all()

# Load marketplace data
marketplace_data = load_marketplace_data()

# API for creating a new asset
@app.route('/api/assets', methods=['POST'])
@jwt_required()
def create_asset():
    current_user_id = get_jwt_identity()
    current_user = User.query.get(current_user_id)

    if not current_user:
        return jsonify({'message': 'User not found'}), 404

    data = request.get_json()
    title = data.get('title')
    description = data.get('description')
    category = data.get('category')
    asset_type = data.get('assetType')
    price = data.get('price')
    royalty_rate = data.get('royaltyRate')
    supply = data.get('supply')
    utility = ','.join(data.get('utility', []))
    collaborators = data.get('collaborators')
    image = data.get('image') # Assuming image is a URL or base64 string for now

    if not all([title, description, category, asset_type, price, royalty_rate, supply]):
        return jsonify({'message': 'Missing required asset fields'}), 400

    new_asset = Asset(
        title=title,
        description=description,
        category=category,
        asset_type=asset_type,
        price=float(price),
        royalty_rate=float(royalty_rate),
        supply=int(supply),
        utility=utility,
        collaborators=collaborators,
        image=image,
        creator_id=current_user.id
    )
    db.session.add(new_asset)
    db.session.commit()

    return jsonify({'message': 'Asset created successfully', 'asset_id': new_asset.id}), 201

# API for retrieving all assets
@app.route('/api/assets', methods=['GET'])
def get_all_assets():
    assets = Asset.query.all()
    assets_data = []
    for asset in assets:
        assets_data.append({
            'id': asset.id,
            'title': asset.title,
            'description': asset.description,
            'category': asset.category,
            'assetType': asset.asset_type,
            'price': asset.price,
            'royaltyRate': asset.royalty_rate,
            'supply': asset.supply,
            'utility': asset.utility.split(',') if asset.utility else [],
            'collaborators': asset.collaborators,
            'image': asset.image,
            'creator_id': asset.creator_id,
            'verified': asset.verified,
            'fundingProgress': asset.funding_progress,
            'status': asset.status,
            'revenue': asset.revenue,
            'funded': asset.funded
        })
    return jsonify(assets_data), 200

# API for retrieving a single asset by ID
@app.route('/api/assets/<int:asset_id>', methods=['GET'])
def get_asset(asset_id):
    asset = Asset.query.get(asset_id)
    if not asset:
        return jsonify({'message': 'Asset not found'}), 404
    asset_data = {
        'id': asset.id,
        'title': asset.title,
        'description': asset.description,
        'category': asset.category,
        'assetType': asset.asset_type,
        'price': asset.price,
        'royaltyRate': asset.royalty_rate,
        'supply': asset.supply,
        'utility': asset.utility.split(',') if asset.utility else [],
        'collaborators': asset.collaborators,
        'image': asset.image,
        'creator_id': asset.creator_id,
        'verified': asset.verified,
        'fundingProgress': asset.funding_progress,
        'status': asset.status,
        'revenue': asset.revenue,
        'funded': asset.funded
    }
    return jsonify(asset_data), 200



# API for user registration
@app.route('/api/register', methods=['POST'])
def api_register():
    data = request.get_json()
    print(f"Received registration data: {data}") # Debugging line
    username = data.get('username')
    email = data.get('email')
    password = data.get('password')
    user_type = data.get('userType')

    if not username or not email or not password or not user_type:
        return jsonify({'message': 'Missing username, email, password, or usertype'}), 400

    if User.query.filter_by(username=username).first():
        return jsonify({'message': 'Username already exists'}), 409
    if User.query.filter_by(email=email).first():
        return jsonify({'message': 'Email already registered'}), 409

    new_user = User(username=username, email=email, userType=user_type)
    new_user.set_password(password)
    db.session.add(new_user)
    db.session.commit()

    return jsonify({'message': 'User registered successfully'}), 200

# API for user login
@app.route('/api/login', methods=['POST'])
def api_login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')
    usertype = data.get('userType')

    print(f"Received login data: {data}") # Debugging line

    if not username or not password or not usertype:
        return jsonify({'message': 'Missing username, password, or usertype'}), 400

    user = User.query.filter_by(username=username).first()

    if user and user.check_password(password) and user.userType == usertype:
        access_token = create_access_token(identity=user.id)
        return jsonify(token=access_token), 200
    else:
        return jsonify({'message': 'Invalid username, password, or usertype'}), 401

# API for user logout (JWT-based logout is typically client-side token removal)
@app.route('/api/logout', methods=['POST'])
@jwt_required()
def api_logout():
    # For JWT, logout is typically handled client-side by deleting the token.
    # This endpoint can be used for any server-side cleanup if necessary.
    return jsonify({'message': 'Logged out successfully (client-side token removal expected)'}), 200


@app.route('/api/kb', methods=['GET'])
def get_knowledge_base():
    creators, products, nfts, funding_thresholds = load_marketplace_data()
    return jsonify({
        'creators': creators,
        'products': products,
        'nfts': nfts,
        'funding_thresholds': funding_thresholds
    }), 200

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True, host='0.0.0.0', port=5001)