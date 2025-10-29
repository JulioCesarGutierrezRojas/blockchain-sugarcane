#![no_std]
use soroban_sdk::{contract, contractimpl, contracttype, Env, Address, Symbol, String, Vec};

#[contract]
pub struct Contract;

#[contracttype]
#[derive(Clone)]
pub struct TokenData {
    //pub farmer: Address,
    pub location: String,
    pub co2_amount: i128,
    pub date: u64,
    pub valid_until: u64,
    pub auditor: Option<Address>,
}

// This is a sample contract. Replace this placeholder with your own contract logic.
// A corresponding test example is available in `test.rs`.
//
// For comprehensive examples, visit <https://github.com/stellar/soroban-examples>.
// The repository includes use cases for the Stellar ecosystem, such as data storage on
// the blockchain, token swaps, liquidity pools, and more.
//
// Refer to the official documentation:
// <https://developers.stellar.org/docs/build/smart-contracts/overview>.
#[contractimpl]
impl Contract {
    /*pub fn hello(env: Env, to: String) -> Vec<String> {
        vec![&env, String::from_str(&env, "Hello"), to]
    }*/

    // Mint: crea un registro de token con metadatos
    pub fn mint(
        env: Env,
        farmer: Address,
        location: String,
        co2_amount: i128,
        date: u64,
        valid_until: u64,
        auditor: Option<Address>,
    ) {
        // Usar Symbol::new en lugar del obsoleto Symbol::short
        let key = (Symbol::new(&env, "tokens"), farmer.clone());

        // Traer lista actual de tokens del agricultor (ahora como Vec<TokenData>)
        let mut tokens: Vec<TokenData> =
            env.storage().persistent().get(&key).unwrap_or(Vec::new(&env));

        // Crear nuevo token (como un struct)
        let data = TokenData {
            location,
            co2_amount,
            date,
            valid_until,
            auditor,
        };

        // Agregar token a la lista
        tokens.push_back(data);

        // Guardar de nuevo
        env.storage().persistent().set(&key, &tokens);
    }

    // Obtener todos los tokens de un agricultor
    pub fn get_tokens(env: Env, farmer: Address) -> Vec<TokenData> {
        let key = (Symbol::new(&env, "tokens"), farmer.clone());
        env.storage().persistent().get(&key).unwrap_or(Vec::new(&env))
    }

    // Calcular el total de CO₂ tokenizado
    pub fn total_co2(env: Env, farmer: Address) -> i128 {
        let tokens = Self::get_tokens(env.clone(), farmer.clone());
        let mut total: i128 = 0;

        // Iterar es mucho más simple ahora
        for t in tokens.iter() {
            // Acceso directo al campo, sin necesidad de parsear
            total += t.co2_amount;
        }
        total
    }

}

mod test;
