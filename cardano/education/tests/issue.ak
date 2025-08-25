use basix_ip_marketplace/education/validators/issue
use aiken/transaction.{ScriptContext, Transaction}
use aiken/transaction/credential.{VerificationKey}

test issue_succeeds() {
  let issuer_key = "pubkey_0"
  let issuer_vk = VerificationKey(issuer_key)

  let redeemer = issue.Redeemer { issuer: issuer_vk }

  let context = ScriptContext { transaction: Transaction { extra_signatories: [issuer_vk], .. }, .. }

  issue.issue(redeemer, context)
}

test issue_fails() {
  let issuer_key = "pubkey_0"
  let issuer_vk = VerificationKey(issuer_key)

  let redeemer = issue.Redeemer { issuer: issuer_vk }

  let other_key = "pubkey_1"
  let other_vk = VerificationKey(other_key)

  let context = ScriptContext { transaction: Transaction { extra_signatories: [other_vk], .. }, .. }

  !issue.issue(redeemer, context)
}