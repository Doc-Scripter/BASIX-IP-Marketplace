def load_kb():
    creators = {
        "Alice": {"wallet": "addr1", "skills": ["art", "beadwork"]},
        "Bob": {"wallet": "addr2", "skills": ["music", "performance"]},
        "Charlie": {"wallet": "addr3", "skills": ["fashion", "design"]},
        "David": {"wallet": "addr4", "skills": ["software", "ai", "games"]},
    }

    products = {
        "Maasai_Necklace": {"type": "ArtCraft", "category": "Beadwork", "creator": "Alice"},
        "AfrobeatTrack1": {"type": "Music", "category": "Afrobeat", "creator": "Bob"},
        "Maasai_Shuka": {"type": "Fashion", "category": "Textile", "creator": "Charlie"},
        "Safari_Package1": {"type": "Tourism", "category": "Safari", "creator": ["Alice", "Bob"]},
        "OralHistory1": {"type": "Heritage", "category": "OralHistory", "creator": "Charlie"},
        "AIModel1": {"type": "Software", "category": "AI/ML", "creator": "David"},
        "Game1": {"type": "Software", "category": "Gaming", "creator": "David"},
    }

    nfts = {
        "NFT_MaasaiNecklace": {"product": "Maasai_Necklace", "utilities": ["provenance", "resale_rights"], "ownership": {"Alice": "100%"}},
        "NFT_AfrobeatTrack1": {"product": "AfrobeatTrack1", "utilities": ["streaming_rights", "royalties"], "ownership": {"Bob": "100%"}},
        "NFT_Shuka1": {"product": "Maasai_Shuka", "utilities": ["redeem_physical", "digital_wearable"], "ownership": {"Charlie": "100%"}},
        "NFT_Safari1": {"product": "Safari_Package1", "utilities": ["redeemable_experience", "eco_tourism_support"], "ownership": {"Alice": "60%", "Bob": "40%"}},
        "NFT_OralHistory1": {"product": "OralHistory1", "utilities": ["archive_access", "preservation_funding"], "ownership": {"Charlie": "100%"}},
        "NFT_AIModel1": {"product": "AIModel1", "utilities": ["license_key", "subscription_access", "royalty_share"], "ownership": {"David": "100%"}},
        "NFT_Game1": {"product": "Game1", "utilities": ["lifetime_access", "in_game_assets", "updates_access"], "ownership": {"David": "100%"}},
    }

    funding_thresholds = {
        "NFT_MaasaiNecklace": 500,
        "NFT_AfrobeatTrack1": 1000,
        "NFT_Shuka1": 700,
        "NFT_Safari1": 2000,
        "NFT_OralHistory1": 1500,
        "NFT_AIModel1": 5000,
        "NFT_Game1": 3000,
    }

    return creators, products, nfts, funding_thresholds
