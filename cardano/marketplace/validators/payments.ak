use aiken/transaction.{ScriptContext, Output}
use aiken/transaction/credential.{Address}

type Datum {
  seller: Address,
  price: Int,
}

validator {
  fn payments(datum: Datum, _redeemer: Data, context: ScriptContext) -> Bool {
    let outputs = context.transaction.outputs

    let check_output = fn(output: Output) {
      let valid_address = output.address == datum.seller
      let valid_amount = output.value.lovelace == datum.price

      valid_address && valid_amount
    }

    outputs
      |> list.any(check_output)
  }
}