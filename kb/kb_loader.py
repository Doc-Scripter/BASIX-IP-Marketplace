from hyperon import MeTTa

def load_marketplace_data():
    with open('/home/potter/BASIX-IP-Marketplace/marketplace.metta', 'r') as f:
        metta_data = f.read()

    metta = MeTTa()
    metta.run(metta_data)

    # Use hyperon to query the MeTTa space
    creators = []
    products = []
    nfts = []
    funding_thresholds = {}

    # Query for creators
    for result in metta.run('!(match &self (creator $id $name) ($id $name))'):
        if result and len(result[0]) == 2:
            creators.append({'id': result[0][0].get_object().value, 'name': result[0][1].get_object().value})

    # Query for products
    for result in metta.run('!(match &self (product $id $name $creator_id $description) ($id $name $creator_id $description))'):
        if result and len(result[0]) == 4:
            products.append({'id': result[0][0].get_object().value, 'name': result[0][1].get_object().value, 'creator_id': result[0][2].get_object().value, 'description': result[0][3].get_object().value})

    # Query for NFTs
    for result in metta.run('!(match &self (nft $id $product_id $metadata_hash) ($id $product_id $metadata_hash))'):
        if result and len(result[0]) == 3:
            nfts.append({'id': result[0][0].get_object().value, 'product_id': result[0][1].get_object().value, 'metadata_hash': result[0][2].get_object().value})

    # Query for funding thresholds
    for result in metta.run('!(match &self (funding-threshold $product_id $threshold) ($product_id $threshold))'):
        if result and len(result[0]) == 2:
            funding_thresholds[result[0][0].get_object().value] = int(result[0][1].get_object().value)

    return {
        'creators': creators,
        'products': products,
        'nfts': nfts,
        'funding_thresholds': funding_thresholds
    }
