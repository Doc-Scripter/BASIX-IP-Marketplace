import os

class Config:
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'a_very_secret_key_that_should_be_changed'
    # Cardano Node Configuration
    CARDANO_NODE_SOCKET_PATH = os.environ.get('CARDANO_NODE_SOCKET_PATH', '/path/to/cardano-node.socket')
    CARDANO_NETWORK = os.environ.get('CARDANO_NETWORK', 'testnet') # or 'mainnet'
    # MeTTa Configuration
    METTA_KB_PATH = os.environ.get('METTA_KB_PATH', 'metta_knowledge_base.mtt')
    # SQLite Database Configuration
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL') or \
                              'sqlite:///' + os.path.join(os.path.abspath(os.path.dirname(__file__)), 'app.db')
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    # Add other configurations like API keys, etc.