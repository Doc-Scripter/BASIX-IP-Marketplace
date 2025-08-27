from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash

from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(128))
    usertype = db.Column(db.String(64), nullable=False)

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

    def __repr__(self):
        return '<User %r>' % self.username

class Asset(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(120), nullable=False)
    description = db.Column(db.Text, nullable=False)
    category = db.Column(db.String(50), nullable=False)
    asset_type = db.Column(db.String(50), nullable=False) # 'digital' or 'phygital'
    price = db.Column(db.Float, nullable=False)
    royalty_rate = db.Column(db.Float, nullable=False)
    supply = db.Column(db.Integer, nullable=False)
    utility = db.Column(db.String(255)) # Comma-separated string of utilities
    collaborators = db.Column(db.String(255))
    image = db.Column(db.String(255))
    creator_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    creator = db.relationship('User', backref=db.backref('assets', lazy=True))
    verified = db.Column(db.Boolean, default=False)
    funding_progress = db.Column(db.Float, default=0.0)
    status = db.Column(db.String(50), default='Funding') # e.g., 'Funding', 'Active', 'Completed'
    revenue = db.Column(db.Float, default=0.0)
    funded = db.Column(db.Float, default=0.0)

    def __repr__(self):
        return '<Asset %r>' % self.title