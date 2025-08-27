use basix_ip_marketplace/marketplace/validators/transfer
use aiken/transaction.{ScriptContext, Transaction}
use aiken/transaction/credential.{VerificationKey}

test transfer_succeeds() {
  let owner_key = "pubkey_0"
  let owner_vk = VerificationKey(owner_key)

  let datum = transfer.Datum { owner: owner_vk }

  let context = ScriptContext { transaction: Transaction { extra_signatories: [owner_vk], .. }, .. }

  transfer.transfer(datum, Void, context)
}

test transfer_fails() {
  let owner_key = "pubkey_0"
  let owner_vk = VerificationKey(owner_key)

  let datum = transfer.Datum { owner: owner_vk }

  let other_key = "pubkey_1"
  let other_vk = VerificationKey(other_key)

  let context = ScriptContext { transaction: Transaction { extra_signatories: [other_vk], .. }, .. }

  !transfer.transfer(datum, Void, context)
}