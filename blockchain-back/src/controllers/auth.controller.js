const { login, logout } = require('../services/Auth.service');
const { Router } = require('express');
const router = Router();

const loginController = async (req, res) => {
    try {
        const { email, password } = req.body
        const result = await login(email, password)
        return res.status(result.getStatusCode()).json(result.getResponseBody())
    } catch (error) {
        console.log('Error en loginController: ', error.message)
        return res.status(500).json({ message: error.message })
    }
}

const logoutController = async (req, res) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(400).json({ message: 'Token no proporcionado' });
        }

        const token = authHeader.substring(7); // Remover "Bearer "

        const result = await logout(token);
        return res.status(result.getStatusCode()).json(result.getResponseBody());
    } catch (error) {
        console.log('Error en logoutController: ', error.message);
        return res.status(500).json({ message: error.message });
    }
}

module.exports = {
    loginController,
    logoutController
};