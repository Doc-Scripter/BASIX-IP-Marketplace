; Marketplace Knowledge Base

; ---- Creators ----
(Creator Alice wallet addr1 skills ["art" "beadwork"])
(Creator Bob wallet addr2 skills ["music" "performance"])
(Creator Charlie wallet addr3 skills ["fashion" "design"])
(Creator David wallet addr4 skills ["software" "ai" "games"])

; ---- Cultural & Creative Products --
; (same as before: Art, Music, Fashion)

;  Art & Crafts
(Product Maasai_Necklace type "ArtCraft"
         description "Original Maasai Bead Necklace"
         category "Beadwork"
         physical True digital_scan True)
(NFT NFT_MaasaiNecklace links Product Maasai_Necklace)
(Utility NFT_MaasaiNecklace provenance)
(Utility NFT_MaasaiNecklace resale_rights)

;  Music & Performance
(Product AfrobeatTrack1 type "Music" category "Afrobeat" digital True)
(NFT NFT_AfrobeatTrack1 links Product AfrobeatTrack1)
(Utility NFT_AfrobeatTrack1 streaming_rights)
(Utility NFT_AfrobeatTrack1 royalties)

; Fashion & Design
(Product Maasai_Shuka type "Fashion" category "Textile" physical True redeemable True)
(NFT NFT_Shuka1 links Product Maasai_Shuka)
(Utility NFT_Shuka1 redeem_physical)
(Utility NFT_Shuka1 digital_wearable)

; ---- Community & Heritage Products ----
; Tourism Experiences
(Product Safari_Package1 type "Tourism"
        description "3-day Maasai Mara Safari" redeemable True)
(NFT NFT_Safari1 links Product Safari_Package1)
(Utility NFT_Safari1 redeemable_experience)
(Utility NFT_Safari1 eco_tourism_support)

;  Heritage Content
(Product OralHistory1 type "Heritage"
        description "Luo Oral Storytelling Archive" digital True)
(NFT NFT_OralHistory1 links Product OralHistory1)
(Utility NFT_OralHistory1 archive_access)
(Utility NFT_OralHistory1 preservation_funding)

; Software Products 
(Product AIModel1 type "Software"
        description "AI model for image recognition"
        category "AI/ML" digital True license_based True)
(NFT NFT_AIModel1 links Product AIModel1)
(Utility NFT_AIModel1 license_key)
(Utility NFT_AIModel1 subscription_access)
(Utility NFT_AIModel1 royalty_share)

(Product Game1 type "Software"
        description "Indie Game built in Unity"
        category "Gaming" digital True)
(NFT NFT_Game1 links Product Game1)
(Utility NFT_Game1 lifetime_access)
(Utility NFT_Game1 in_game_assets)
(Utility NFT_Game1 updates_access)

; --- Ownership (examples) 
(NFT NFT_MaasaiNecklace Creator Alice Ownership 100%)
(NFT NFT_AfrobeatTrack1 Creator Bob Ownership 100%)
(NFT NFT_Shuka1 Creator Charlie Ownership 100%)
(NFT NFT_Safari1 Creator Alice Ownership 60%)
(NFT NFT_Safari1 Creator Bob Ownership 40%)
(NFT NFT_OralHistory1 Creator Charlie Ownership 100%)
(NFT NFT_AIModel1 Creator David Ownership 100%)
(NFT NFT_Game1 Creator David Ownership 100%)

;  Funding thresholds 
(FundingThreshold NFT_MaasaiNecklace 500)
(FundingThreshold NFT_AfrobeatTrack1 1000)
(FundingThreshold NFT_Shuka1 700)
(FundingThreshold NFT_Safari1 2000)
(FundingThreshold NFT_OralHistory1 1500)
(FundingThreshold NFT_AIModel1 5000)
(FundingThreshold NFT_Game1 3000)

; Marketplace Knowledge Base 


; ---- Creators ----
(Creator Alice wallet addr1 skills ["art" "beadwork"] reputation_score 80)
(Creator Bob wallet addr2 skills ["music" "performance"] reputation_score 70)
(Creator Charlie wallet addr3 skills ["fashion" "design"] reputation_score 65)
(Creator David wallet addr4 skills ["software" "ai" "games"] reputation_score 90)

; ---- Cultural & Creative Products ----

;  Art & Crafts
(Product Maasai_Necklace type "ArtCraft"
         description "Original Maasai Bead Necklace"
         category "Beadwork"
         physical True digital_scan True)
(NFT NFT_MaasaiNecklace links Product Maasai_Necklace)
(Utility NFT_MaasaiNecklace provenance)
(Utility NFT_MaasaiNecklace resale_rights)

;  Music & Performance
(Product AfrobeatTrack1 type "Music" category "Afrobeat" digital True)
(NFT NFT_AfrobeatTrack1 links Product AfrobeatTrack1)
(Utility NFT_AfrobeatTrack1 streaming_rights)
(Utility NFT_AfrobeatTrack1 royalties)

;  Fashion & Design
(Product Maasai_Shuka type "Fashion" category "Textile" physical True redeemable True)
(NFT NFT_Shuka1 links Product Maasai_Shuka)
(Utility NFT_Shuka1 redeem_physical)
(Utility NFT_Shuka1 digital_wearable)

;  Community & Heritage Products 

(Product Safari_Package1 type "Tourism"
        description "3-day Maasai Mara Safari" redeemable True)
(NFT NFT_Safari1 links Product Safari_Package1)
(Utility NFT_Safari1 redeemable_experience)
(Utility NFT_Safari1 eco_tourism_support)

(Product OralHistory1 type "Heritage"
        description "Luo Oral Storytelling Archive" digital True)
(NFT NFT_OralHistory1 links Product OralHistory1)
(Utility NFT_OralHistory1 archive_access)
(Utility NFT_OralHistory1 preservation_funding)

; ---- Software Products ----

(Product AIModel1 type "Software"
        description "AI model for image recognition"
        category "AI/ML" digital True license_based True)
(NFT NFT_AIModel1 links Product AIModel1)
(Utility NFT_AIModel1 license_key)
(Utility NFT_AIModel1 subscription_access)
(Utility NFT_AIModel1 royalty_share)

(Product Game1 type "Software"
        description "Indie Game built in Unity"
        category "Gaming" digital True)
(NFT NFT_Game1 links Product Game1)
(Utility NFT_Game1 lifetime_access)
(Utility NFT_Game1 in_game_assets)
(Utility NFT_Game1 updates_access)


; ---- Ownership Enhancements ----


; ✅ Fractional & Dynamic Ownership
(Ownership NFT_MaasaiNecklace Alice 70%)
(Ownership NFT_MaasaiNecklace Bob 30%)
(DynamicOwnership NFT_MaasaiNecklace transfer_rule "Bob can gain +10% if he contributes 100 sales")
(DynamicOwnership NFT_AfrobeatTrack1 decay_rule "Ownership reduces by 5% if not maintained with updates")

; ✅ Governance (Reputation Weighted)
(GovernanceVote NFT_Safari1 Creator Alice weight 0.6 reputation_weighted True)
(GovernanceVote NFT_Safari1 Creator Bob weight 0.4 reputation_weighted True)


; ---- Utility Gating Enhancements ----

(UtilityGate NFT_Shuka1 condition ">=20% ownership required" utility redeem_physical)
(UtilityGate NFT_AIModel1 condition ">=50% ownership required" utility royalty_share)
(UtilityGate NFT_Game1 condition "subscription_active" utility updates_access)


; ---- Impact Scoring Enhancements ----

(ImpactScore NFT_Safari1 heritage_value 90 sustainability_score 85 sdg_alignment ["Tourism" "Wildlife_Protection"])
(ImpactScore NFT_OralHistory1 heritage_value 95 sustainability_score 70 sdg_alignment ["Culture" "Education"])
(ImpactScore NFT_AIModel1 heritage_value 40 sustainability_score 60 sdg_alignment ["Innovation" "Tech4Good"])
(ImpactScore NFT_MaasaiNecklace heritage_value 85 sustainability_score 80 sdg_alignment ["Artisan_Economy" "Women_Empowerment"])


; ---- Funding thresholds ----

(FundingThreshold NFT_MaasaiNecklace 500)
(FundingThreshold NFT_AfrobeatTrack1 1000)
(FundingThreshold NFT_Shuka1 700)
(FundingThreshold NFT_Safari1 2000)
(FundingThreshold NFT_OralHistory1 1500)
(FundingThreshold NFT_AIModel1 5000)
(FundingThreshold NFT_Game1 3000)


;  New Smart Functions 

;  Append NFT history with an action (e.g., sale, transfer, upgrade)
(append_history NFT_MaasaiNecklace action "sold_to_userX")
(append_history NFT_AfrobeatTrack1 action "streamed_1000_times")

;  Calculate impact score (based on reputation + votes)
(impact_score NFT_MaasaiNecklace value 82)
(impact_score NFT_Safari1 value 88)

; Check if user is a creator (minted ≥ 1 NFT)
(is_creator Alice True)
(is_creator Bob True)
(is_creator Charlie True)
(is_creator David True)
