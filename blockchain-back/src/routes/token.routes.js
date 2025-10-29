const { Router } = require('express');
const { issueToken, getAccountBalance } = require('../controllers/token.controller.js');

const routerToken = Router();

routerToken.post('/issue', issueToken);
routerToken.get('/balance/:farmer', getAccountBalance);

module.exports = routerToken;
