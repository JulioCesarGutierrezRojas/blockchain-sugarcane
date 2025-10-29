const { rpc } = require('@stellar/stellar-sdk');
process.loadEnvFile()

// Red de prueba Soroban
exports.sorobanServer = new rpc.Server('https://soroban-testnet.stellar.org', {
    // Es buena práctica incluir el objeto de opciones
    allowHttp: new URL('https://soroban-testnet.stellar.org').protocol === 'http:',
});

// Direccion del contrato desplegado
exports.CONTRACT_ID = 'CBLQET6D3UYZVU7APTBGXU2W4JGYWVTF3PBT5NGP6PPORBWMERQ2DKNH'

// Clave del emisor (cuenta que creo el contrato)
exports.ISSUER_SECRET = process.env.ISSUER_SECRET