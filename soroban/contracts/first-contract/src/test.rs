#![cfg(test)]

use super::*;
// Importa los tipos que necesitarás para el test
use soroban_sdk::{Env, String, Address, vec};
use soroban_sdk::testutils::Address as _;

#[test]
fn test_mint_and_query_tokens() {
    let env = Env::default();

    // Registra el contrato y obtén un cliente
    // (Usamos register_contract, que es la forma estándar)
    let contract_id = env.register_contract(None, Contract);
    let client = ContractClient::new(&env, &contract_id);

    // --- Preparamos las direcciones (Addresses) ---
    // Address::generate es la forma estándar de crear direcciones en los tests
    let farmer_1 = Address::generate(&env);
    let auditor_1 = Address::generate(&env);

    // --- Probamos que el agricultor empieza con 0 ---
    let initial_tokens = client.get_tokens(&farmer_1);
    assert_eq!(initial_tokens.len(), 0); // Debe tener 0 tokens

    let initial_co2 = client.total_co2(&farmer_1);
    assert_eq!(initial_co2, 0); // Debe tener 0 de CO2

    // --- 1. Probamos la función `mint` ---
    client.mint(
        &farmer_1,                          // farmer
        &String::from_str(&env, "Lote A"),  // location
        &100,                               // co2_amount
        &1678886400,                        // date (un timestamp de ejemplo)
        &1710460800,                        // valid_until
        &Some(auditor_1.clone()),           // auditor
    );

    // --- 2. Probamos `get_tokens` ---
    let tokens = client.get_tokens(&farmer_1);
    assert_eq!(tokens.len(), 1); // Ahora debe tener 1 token

    // Verificamos el contenido del token
    let token_data = tokens.get(0).unwrap();
    assert_eq!(token_data.location, String::from_str(&env, "Lote A"));
    assert_eq!(token_data.co2_amount, 100);
    assert_eq!(token_data.auditor, Some(auditor_1));

    // --- 3. Probamos `mint` por segunda vez ---
    client.mint(
        &farmer_1,                          // farmer (mismo agricultor)
        &String::from_str(&env, "Lote B"),  // location
        &50,                                // co2_amount
        &1678886401,                        // date
        &1710460801,                        // valid_until
        &None,                              // Sin auditor esta vez
    );

    // --- 4. Probamos `total_co2` ---
    let total = client.total_co2(&farmer_1);
    assert_eq!(total, 150); // 100 (del Lote A) + 50 (del Lote B)

    // Verificamos que get_tokens ahora devuelve 2
    let all_tokens = client.get_tokens(&farmer_1);
    assert_eq!(all_tokens.len(), 2);

    // --- 5. Probamos con un agricultor diferente ---
    let farmer_2 = Address::generate(&env);
    let total_2 = client.total_co2(&farmer_2);
    assert_eq!(total_2, 0); // farmer_2 no debe tener CO2
}
