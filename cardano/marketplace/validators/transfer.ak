use aiken/transaction.{ScriptContext}
use aiken/transaction/credential.{VerificationKey}

type Datum {
  owner: VerificationKey,
}

validator {
  fn transfer(datum: Datum, _redeemer: Data, context: ScriptContext) -> Bool {
    let signed_by_owner = context.transaction.extra_signatories
      |> list.has(datum.owner)

    signed_by_owner
  }
}