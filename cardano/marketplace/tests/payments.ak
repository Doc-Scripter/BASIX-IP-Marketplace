use basix_ip_marketplace/marketplace/validators/payments
use aiken/transaction.{ScriptContext, Transaction, Output}
use aiken/transaction/credential.{Address, VerificationKey}
use aiken/primitive/value.{Value}

test payments_succeeds() {
  let seller_key = "pubkey_0"
  let seller_vk = VerificationKey(seller_key)
  let seller_address = Address(seller_vk, None)

  let price = 1000000

  let datum = payments.Datum { seller: seller_address, price: price }

  let output = Output { address: seller_address, value: Value { lovelace: price, .. }, .. }

  let context = ScriptContext { transaction: Transaction { outputs: [output], .. }, .. }

  payments.payments(datum, Void, context)
}

test payments_fails_wrong_address() {
  let seller_key = "pubkey_0"
  let seller_vk = VerificationKey(seller_key)
  let seller_address = Address(seller_vk, None)

  let other_key = "pubkey_1"
  let other_vk = VerificationKey(other_key)
  let other_address = Address(other_vk, None)

  let price = 1000000

  let datum = payments.Datum { seller: seller_address, price: price }

  let output = Output { address: other_address, value: Value { lovelace: price, .. }, .. }

  let context = ScriptContext { transaction: Transaction { outputs: [output], .. }, .. }

  !payments.payments(datum, Void, context)
}

test payments_fails_wrong_amount() {
  let seller_key = "pubkey_0"
  let seller_vk = VerificationKey(seller_key)
  let seller_address = Address(seller_vk, None)

  let price = 1000000
  let wrong_price = 500000

  let datum = payments.Datum { seller: seller_address, price: price }

  let output = Output { address: seller_address, value: Value { lovelace: wrong_price, .. }, .. }

  let context = ScriptContext { transaction: Transaction { outputs: [output], .. }, .. }

  !payments.payments(datum, Void, context)
}