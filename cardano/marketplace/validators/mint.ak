use aiken/transaction.{ScriptContext}
use aiken/transaction/credential.{VerificationKey}

type Redeemer {
  creator: VerificationKey,
}

validator {
  fn mint(redeemer: Redeemer, context: ScriptContext) -> Bool {
    let signed_by_creator = context.transaction.extra_signatories
      |> list.has(redeemer.creator)

    signed_by_creator
  }
}