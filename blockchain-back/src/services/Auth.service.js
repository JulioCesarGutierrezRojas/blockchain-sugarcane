const User = require('../models/user.model');
const { generarToken } = require('../utils/jwt'); 
const { hashPassword, compararPassword } = require('../kernel/bcrypt');
const ApiResponse = require('../kernel/api.response');
const TypesResponse = require('../kernel/types.response');
const sequelize = require('../config/database');
const { Op } = require('sequelize');


const login = async (email, password) => {
    try{
        if (!email || !password){
            return new ApiResponse(null, null, TypesResponse.WARNING, 'Email y contraseña son requeridos', 400)
        }

        const user = await User.findOne({where: { email }})
        if(!user){
            return new ApiResponse(null, null, TypesResponse.WARNING, 'Usuario no encontrado', 400)
        }

        const valid = await compararPassword(password, user.password)
        if(!valid){
            return new ApiResponse(null, null, TypesResponse.WARNING, 'Credenciales invalidas', 400)
        }

        const token = generarToken({ user_id: user.user_id, role: user.role })

        const loginData = {
            token,
            user: {
                id: user.user_id,
                name: user.name,
                role: user.role,
                email: user.email
            }
        }

        return new ApiResponse(null, loginData, TypesResponse.SUCCESS, 'Login exitoso', 200)
    }catch(error){
        console.log('Error en login service: ', error.message)
        throw new Error(error.message || 'Error al iniciar sesión')
    }
}

const logout = async (token) => {
    try {
        if (!token) {
            return new ApiResponse(null, null, TypesResponse.WARNING, 'Token es requerido para cerrar sesión', 400);
        }

        addToBlacklist(token);
        console.log('🚪 Token agregado a blacklist para logout');
        
        return new ApiResponse(null, null, TypesResponse.SUCCESS, 'Sesión cerrada exitosamente', 200);
    } catch (error) {
        console.error('Error en logout service:', error.message);
        return new ApiResponse(null, null, TypesResponse.ERROR, 'Error al cerrar sesión', 500);
    }
}

module.exports = {
    login,
    logout
};