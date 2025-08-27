use aiken/transaction.{ScriptContext}
use aiken/transaction/credential.{VerificationKey}

type Redeemer {
  issuer: VerificationKey,
}

validator {
  fn issue(redeemer: Redeemer, context: ScriptContext) -> Bool {
    let signed_by_issuer = context.transaction.extra_signatories
      |> list.has(redeemer.issuer)

    signed_by_issuer
  }
}