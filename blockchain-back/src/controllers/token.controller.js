const { mintCO2Token, getBalance } = require('../services/soroban.service.js');

/**
 * Emite tokens CO₂ a una cuenta
 */
const issueToken = async (req, res) => {
    try {
        const { farmer, location, co2_amount, date, valid_until, auditor } = req.body;
        const response = await mintCO2Token({ farmer, location, co2_amount, date, valid_until, auditor });
        res.json({ message: 'Token CO₂ emitido correctamente', tx: response });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


/**
 * Consulta balance
 */
const getAccountBalance = async (req, res) => {
    try {
        const { farmer } = req.params;
        const balance = await getBalance(farmer);
        res.json({ farmer, balance });
    } catch (error) {
        res.status(500).json({ error: 'Error al consultar balance' + error.message });
    }
};

module.exports = {
    issueToken,
    getAccountBalance
}
