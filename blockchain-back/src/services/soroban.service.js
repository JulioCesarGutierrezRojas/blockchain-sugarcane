const {Contract, Keypair, TransactionBuilder, Networks, BASE_FEE} = require('@stellar/stellar-sdk');
const { sorobanServer, CONTRACT_ID, ISSUER_SECRET } = require('../config/stellar.js');

const issuerKeypair = Keypair.fromSecret(ISSUER_SECRET);

/**
 * Invoca el contrato para emitir tokens CO₂
 */
async function mintCO2Token({farmer, location, co2_amount, date, valid_until, auditor = null,}) {
    const contract = new Contract(CONTRACT_ID);
    const sourceAccount = await sorobanServer.loadAccount(issuerKeypair.publicKey());

    const tx = new TransactionBuilder(sourceAccount, {
        fee: BASE_FEE,
        networkPassphrase: Networks.TESTNET,
    })
        .addOperation(
            contract.call(
                'mint',
                farmer,
                location,
                co2_amount,
                date,
                valid_until,
                auditor
            )
        )
        .setTimeout(30)
        .build();

    tx.sign(issuerKeypair);
    const response = await sorobanServer.sendTransaction(tx);
    return response;
}


/**
 * Consulta balance de tokens CO₂
 */
async function getBalance(farmer) {
    const contract = new Contract(CONTRACT_ID);
    const result = await contract.call('get_tokens', farmer);
    return result;
}

module.exports = {
    mintCO2Token,
    getBalance
}
