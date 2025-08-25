from flask import Flask, request, jsonify, render_template, send_from_directory
import os
from flask import Flask, send_from_directory, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager, login_user, logout_user, login_required, current_user
from flask_jwt_extended import JWTManager, jwt_required
from config import Config

app = Flask(__name__, template_folder='templates', static_folder='static')
jwt = JWTManager(app)
app.config.from_object(Config)

db = SQLAlchemy()
login_manager = LoginManager()
login_manager.login_view = 'login'

# Import models AFTER db and login_manager are defined
from models import User

db.init_app(app)
login_manager.init_app(app)

@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))

# Create database tables if they don't exist
with app.app_context():
    db.create_all()



# API for user registration
@app.route('/api/register', methods=['POST'])
def api_register():
    data = request.get_json()
    username = data.get('username')
    email = data.get('email')
    password = data.get('password')

    if not username or not email or not password:
        return jsonify({'message': 'Missing username, email, or password'}), 400

    if User.query.filter_by(username=username).first():
        return jsonify({'message': 'Username already exists'}), 409
    if User.query.filter_by(email=email).first():
        return jsonify({'message': 'Email already registered'}), 409

    new_user = User(username=username, email=email)
    new_user.set_password(password)
    db.session.add(new_user)
    db.session.commit()

    return jsonify({'message': 'User registered successfully'}), 201

# API for user login
@app.route('/api/login', methods=['POST'])
def api_login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    user = User.query.filter_by(username=username).first()

    if user and user.check_password(password):
        login_user(user)
        return jsonify({'message': 'Logged in successfully', 'user': {'username': user.username, 'email': user.email}}), 200
    else:
        return jsonify({'message': 'Invalid username or password'}), 401

# API for user logout
@app.route('/api/logout', methods=['POST'])
@login_required
def logout():
    logout_user()
    return jsonify({'message': 'Logged out successfully'}), 200

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/about')
def about():
    return render_template('about.html')

@app.route('/login')
def login():
    return render_template('login.html')

@app.route('/register')
def register():
    return render_template('register.html')

# protected route
@app.route('/homepage')
@jwt_required()
def homepage():
    return render_template('homepage.html')

@app.route('/protected')
@jwt_required()
def protected():
    return jsonify({'message': f'Hello, {current_user.username}! You are authenticated.'}), 200

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)