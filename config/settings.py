# config/settings.py
import os
from dotenv import load_dotenv

load_dotenv()

BLOCKFROST_PROJECT_ID = os.getenv("BLOCKFROST_PROJECT_ID", "")
ADMIN_SKEY_PATH = os.getenv("ADMIN_SKEY_PATH", "admin.payment.skey")
NETWORK_NAME = os.getenv("NETWORK", "preprod").lower()  # preprod | preview | mainnet
