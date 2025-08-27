use basix_ip_marketplace/marketplace/validators/mint
use aiken/transaction.{ScriptContext, Transaction}
use aiken/transaction/credential.{VerificationKey}

test mint_succeeds() {
  let creator_key = "pubkey_0"
  let creator_vk = VerificationKey(creator_key)

  let redeemer = mint.Redeemer { creator: creator_vk }

  let context = ScriptContext { transaction: Transaction { extra_signatories: [creator_vk], .. }, .. }

  mint.mint(redeemer, context)
}

test mint_fails() {
  let creator_key = "pubkey_0"
  let creator_vk = VerificationKey(creator_key)

  let redeemer = mint.Redeemer { creator: creator_vk }

  let other_key = "pubkey_1"
  let other_vk = VerificationKey(other_key)

  let context = ScriptContext { transaction: Transaction { extra_signatories: [other_vk], .. }, .. }

  !mint.mint(redeemer, context)
}