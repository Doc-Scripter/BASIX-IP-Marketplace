import sys, os
sys.path.append(os.path.dirname(os.path.dirname(__file__)))


from chain import utxos_at, build_unsigned_deposit_tx

# Your funded Preprod test address
addr = "addr_test1qz5rpvv4nt8fyfm7wunhduer8hp6z2whet7vzza2u7zv3frld4mwwmwudn8qpkqm5feaall8w4nan3f5za7tjygrx93qgn79h0"

def test_utxos():
    utxos = utxos_at(addr)
    print("\n🔹 UTxOs at address:")
    for u in utxos:
        print(u)

def test_build_tx():
    tx = build_unsigned_deposit_tx(addr, 5_000_000)  # 5 ADA in lovelace
    print("\n🔹 Unsigned Transaction:")
    print(tx)

if __name__ == "__main__":
    test_utxos()
    test_build_tx()
