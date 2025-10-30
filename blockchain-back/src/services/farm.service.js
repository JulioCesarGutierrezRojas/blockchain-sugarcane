const Farm = require('../model/farm.model');
const User = require('../model/user.model');
const sequelize = require('../../config/database');
const ApiResponse = require('../../kernel/api.response');
const TypesResponse = require('../../kernel/types.response');

const createFarm = async (farmData) => {
    const transaction = await sequelize.transaction();
    try {
        const { user_id, name, location, total_hectares, planting_date } = farmData;

        if (!user_id || !name || !location || !total_hectares || !planting_date) {
            await transaction.rollback();
            return new ApiResponse(null, null, TypesResponse.WARNING, 'Faltan datos obligatorios para crear la granja', 400);
        }

        const userExist = await User.findByPk(user_id);
        if (!userExist) {
            await transaction.rollback();
            return new ApiResponse(null, null, TypesResponse.WARNING, 'El usuario no existe', 404);
        }

        const newFarm = await Farm.create(farmData, { transaction });

        await transaction.commit();
        return new ApiResponse(null, newFarm, TypesResponse.SUCCESS, 'Granja creada exitosamente', 201);

    } catch (error) {
        await transaction.rollback();
        console.error('Error en createFarm:', error);
        return new ApiResponse(null, null, TypesResponse.ERROR, 'Error interno al crear la granja', 500);
    }
};

const getFarmsByUser = async (user_id) => {
    try {
        const farms = await Farm.findAll({
            where: { user_id },
            include: [
                {
                    model: User,
                    as: 'User',
                    attributes: ['id', 'first_name', 'last_name', 'stellar_address']
                }
            ]
        });

        if (!farms || farms.length === 0) {
            return new ApiResponse(null, null, TypesResponse.WARNING, 'Este usuario no tiene granjas registradas', 404);
        }

        return new ApiResponse(null, farms, TypesResponse.SUCCESS, 'Granjas obtenidas exitosamente', 200);

    } catch (error) {
        console.error('Error en getFarmsByUser:', error);
        return new ApiResponse(null, null, TypesResponse.ERROR, 'Error interno al consultar granjas', 500);
    }
};

const getFarmById = async (id) => {
    try {
        const farm = await Farm.findByPk(id, {
            include: [
                {
                    model: User,
                    as: 'User',
                    attributes: ['id', 'first_name', 'last_name']
                }
            ]
        });

        if (!farm) {
            return new ApiResponse(null, null, TypesResponse.WARNING, 'La granja no existe', 404);
        }

        return new ApiResponse(null, farm, TypesResponse.SUCCESS, 'Granja encontrada', 200);

    } catch (error) {
        console.error('Error en getFarmById:', error);
        return new ApiResponse(null, null, TypesResponse.ERROR, 'Error interno al consultar la granja', 500);
    }
};

const updateFarm = async (id, updateData) => {
    const transaction = await sequelize.transaction();
    try {
        const farm = await Farm.findByPk(id);

        if (!farm) {
            await transaction.rollback();
            return new ApiResponse(null, null, TypesResponse.WARNING, 'La granja no existe para actualizar', 404);
        }

        await Farm.update(updateData, {
            where: { id },
            transaction
        });

        await transaction.commit();
        const updatedFarm = await Farm.findByPk(id);

        return new ApiResponse(null, updatedFarm, TypesResponse.SUCCESS, 'Granja actualizada correctamente', 200);

    } catch (error) {
        await transaction.rollback();
        console.error('Error en updateFarm:', error);
        return new ApiResponse(null, null, TypesResponse.ERROR, 'Error interno al actualizar la granja', 500);
    }
};

const deleteFarm = async (id) => {
    const transaction = await sequelize.transaction();
    try {
        const deleted = await Farm.destroy({
            where: { id },
            transaction
        });

        if (!deleted) {
            await transaction.rollback();
            return new ApiResponse(null, null, TypesResponse.WARNING, 'No se encontró la granja para eliminar', 404);
        }

        await transaction.commit();
        return new ApiResponse(null, null, TypesResponse.SUCCESS, 'Granja eliminada correctamente', 200);

    } catch (error) {
        await transaction.rollback();
        console.error('Error en deleteFarm:', error);
        return new ApiResponse(null, null, TypesResponse.ERROR, 'Error interno al eliminar la granja', 500);
    }
};

module.exports = {
    createFarm,
    getFarmsByUser,
    getFarmById,
    updateFarm,
    deleteFarm
};
