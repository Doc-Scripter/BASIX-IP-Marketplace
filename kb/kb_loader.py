import re
from .metta_parser import load_metta_file
import os

def load_kb():
    filepath = os.path.join(os.path.dirname(__file__), '..', 'marketplace.metta')
    metta_data = load_metta_file(filepath)

    creators = {}
    products = {}
    nfts = {}
    funding_thresholds = {}

    for item in metta_data:
        tag = item['tag']
        content = item['content']

        if tag == 'Creator':
            parts = content.split(' ', 3)
            name = parts[0]
            wallet = parts[2]
            skills_match = re.search(r'\["(.*?)"\]', parts[3])
            skills = skills_match.group(1).split('" "') if skills_match else []
            reputation_score_match = re.search(r'reputation_score (\d+)', parts[3])
            reputation_score = int(reputation_score_match.group(1)) if reputation_score_match else None
            creators[name] = {"wallet": wallet, "skills": skills, "reputation_score": reputation_score}

        elif tag == 'Product':
            parts = content.split(' ', 1)
            product_name = parts[0]
            details = {}
            # This is a simplified parsing. A more robust parser would be needed for complex attributes.
            # For now, we'll just store the raw content.
            products[product_name] = {"raw_content": parts[1]}

        elif tag == 'NFT':
            parts = content.split(' ', 1)
            nft_name = parts[0]
            details = {}
            # Simplified parsing
            nfts[nft_name] = {"raw_content": parts[1]}

        elif tag == 'FundingThreshold':
            parts = content.split(' ')
            nft_name = parts[0]
            threshold = int(parts[1])
            funding_thresholds[nft_name] = threshold

    return creators, products, nfts, funding_thresholds
