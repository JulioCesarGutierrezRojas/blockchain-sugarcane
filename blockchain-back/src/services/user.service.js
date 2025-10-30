const User = require('../model/user.model');
const sequelize = require('../../config/database');
const ApiResponse = require('../../kernel/api.response');
const TypesResponse = require('../../kernel/types.response');

const createUser = async (userData) => {
    const transaction = await sequelize.transaction();
    try {
        const { stellar_address, first_name, last_name, email, phone } = userData;

        if (!stellar_address || stellar_address.length !== 56 || !first_name || !last_name) {
            await transaction.rollback();
            return new ApiResponse(null, null, TypesResponse.WARNING, 'Datos obligatorios faltantes o inválidos', 400);
        }

        const existAddress = await User.findOne({ where: { stellar_address } });
        if (existAddress) {
            await transaction.rollback();
            return new ApiResponse(null, null, TypesResponse.WARNING, 'La dirección Stellar ya está registrada', 409);
        }

        const newUser = await User.create({
            stellar_address,
            first_name,
            last_name,
            email,
            phone
        }, { transaction });

        await transaction.commit();

        return new ApiResponse(null, newUser, TypesResponse.SUCCESS, 'Usuario creado chido', 201);

    } catch (error) {
        await transaction.rollback();
        console.error('Error en createUser:', error);
        return new ApiResponse(null, null, TypesResponse.ERROR, 'Error interno al crear usuario', 500);
    }
};

const getUsers = async () => {
    try {
        const users = await User.findAll({
            attributes: ['id', 'stellar_address', 'first_name', 'last_name', 'email', 'phone']
        });

        return new ApiResponse(null, users, TypesResponse.SUCCESS, 'Usuarios obtenidos', 200);

    } catch (error) {
        console.error('Error en getUsers:', error);
        return new ApiResponse(null, null, TypesResponse.ERROR, 'Error interno al obtener usuarios', 500);
    }
};

const getUserById = async (id) => {
    try {
        const user = await User.findByPk(id);

        if (!user) {
            return new ApiResponse(null, null, TypesResponse.WARNING, 'No existe este usuario', 404);
        }

        return new ApiResponse(null, user, TypesResponse.SUCCESS, 'Usuario encontrado', 200);

    } catch (error) {
        console.error('Error en getUserById:', error);
        return new ApiResponse(null, null, TypesResponse.ERROR, 'Error interno al consultar usuario', 500);
    }
};

const updateUser = async (id, updateData) => {
    const transaction = await sequelize.transaction();
    try {
        const user = await User.findByPk(id);

        if (!user) {
            await transaction.rollback();
            return new ApiResponse(null, null, TypesResponse.WARNING, 'No existe este usuario', 404);
        }

        await User.update(updateData, {
            where: { id },
            transaction
        });

        await transaction.commit();
        const updatedUser = await User.findByPk(id);

        return new ApiResponse(null, updatedUser, TypesResponse.SUCCESS, 'Actualización exitosa', 200);

    } catch (error) {
        await transaction.rollback();
        console.error('Error en updateUser:', error);
        return new ApiResponse(null, null, TypesResponse.ERROR, 'Error interno al actualizar usuario', 500);
    }
};

const deleteUser = async (id) => {
    const transaction = await sequelize.transaction();
    try {
        const deleted = await User.destroy({
            where: { id },
            transaction
        });

        if (!deleted) {
            await transaction.rollback();
            return new ApiResponse(null, null, TypesResponse.WARNING, 'Usuario no encontrado para eliminar', 404);
        }

        await transaction.commit();
        return new ApiResponse(null, null, TypesResponse.SUCCESS, 'Usuario eliminado', 200);

    } catch (error) {
        await transaction.rollback();
        console.error('Error en deleteUser:', error);
        return new ApiResponse(null, null, TypesResponse.ERROR, 'Error interno al eliminar usuario', 500);
    }
};

module.exports = {
    createUser,
    getUsers,
    getUserById,
    updateUser,
    deleteUser
};
