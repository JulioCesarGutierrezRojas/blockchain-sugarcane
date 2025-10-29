const Co2Calculation = require('../model/co2calculation.model');
const Farm = require('../model/farm.model');
const sequelize = require('../../config/database');
const ApiResponse = require('../../kernel/api.response');
const TypesResponse = require('../../kernel/types.response');

const createCalculation = async (calculationData) => {
    const transaction = await sequelize.transaction();
    try {
        const { farm_id, calculation_date, hectares_measured, co2_captured_tons } = calculationData;

        if (!farm_id || !calculation_date || !hectares_measured || !co2_captured_tons) {
            await transaction.rollback();
            return new ApiResponse(null, null, TypesResponse.WARNING, 'Faltan datos obligatorios para registrar el cálculo de CO₂', 400);
        }

        const farmExist = await Farm.findByPk(farm_id);
        if (!farmExist) {
            await transaction.rollback();
            return new ApiResponse(null, null, TypesResponse.WARNING, 'La granja indicada no existe', 404);
        }

        const newCalculation = await Co2Calculation.create(calculationData, { transaction });

        await transaction.commit();
        return new ApiResponse(null, newCalculation, TypesResponse.SUCCESS, 'Cálculo de CO₂ registrado correctamente', 201);

    } catch (error) {
        await transaction.rollback();
        console.error('Error en createCalculation:', error);
        return new ApiResponse(null, null, TypesResponse.ERROR, 'Error interno al crear cálculo de CO₂', 500);
    }
};

const getCalculationsByFarm = async (farm_id) => {
    try {
        const calculations = await Co2Calculation.findAll({
            where: { farm_id },
            include: [
                {
                    model: Farm,
                    as: 'Farm',
                    attributes: ['id', 'name', 'location', 'total_hectares']
                }
            ]
        });

        if (!calculations || calculations.length === 0) {
            return new ApiResponse(null, null, TypesResponse.WARNING, 'No hay cálculos registrados para esta granja', 404);
        }

        return new ApiResponse(null, calculations, TypesResponse.SUCCESS, 'Cálculos de CO₂ obtenidos correctamente', 200);

    } catch (error) {
        console.error('Error en getCalculationsByFarm:', error);
        return new ApiResponse(null, null, TypesResponse.ERROR, 'Error interno al consultar cálculos de CO₂', 500);
    }
};

const getCalculationById = async (id) => {
    try {
        const calculation = await Co2Calculation.findByPk(id, {
            include: [
                {
                    model: Farm,
                    as: 'Farm',
                    attributes: ['id', 'name']
                }
            ]
        });

        if (!calculation) {
            return new ApiResponse(null, null, TypesResponse.WARNING, 'El cálculo no existe', 404);
        }

        return new ApiResponse(null, calculation, TypesResponse.SUCCESS, 'Cálculo encontrado', 200);

    } catch (error) {
        console.error('Error en getCalculationById:', error);
        return new ApiResponse(null, null, TypesResponse.ERROR, 'Error interno al consultar el cálculo', 500);
    }
};

const updateCalculation = async (id, updateData) => {
    const transaction = await sequelize.transaction();
    try {
        const calculation = await Co2Calculation.findByPk(id);

        if (!calculation) {
            await transaction.rollback();
            return new ApiResponse(null, null, TypesResponse.WARNING, 'El cálculo no existe para actualizar', 404);
        }

        await Co2Calculation.update(updateData, {
            where: { id },
            transaction
        });

        await transaction.commit();
        const updatedCalculation = await Co2Calculation.findByPk(id);

        return new ApiResponse(null, updatedCalculation, TypesResponse.SUCCESS, 'Cálculo actualizado correctamente', 200);

    } catch (error) {
        await transaction.rollback();
        console.error('Error en updateCalculation:', error);
        return new ApiResponse(null, null, TypesResponse.ERROR, 'Error interno al actualizar el cálculo', 500);
    }
};

const deleteCalculation = async (id) => {
    const transaction = await sequelize.transaction();
    try {
        const deleted = await Co2Calculation.destroy({
            where: { id },
            transaction
        });

        if (!deleted) {
            await transaction.rollback();
            return new ApiResponse(null, null, TypesResponse.WARNING, 'Cálculo no encontrado para eliminar', 404);
        }

        await transaction.commit();
        return new ApiResponse(null, null, TypesResponse.SUCCESS, 'Cálculo eliminado correctamente', 200);

    } catch (error) {
        await transaction.rollback();
        console.error('Error en deleteCalculation:', error);
        return new ApiResponse(null, null, TypesResponse.ERROR, 'Error interno al eliminar el cálculo', 500);
    }
};

module.exports = {
    createCalculation,
    getCalculationsByFarm,
    getCalculationById,
    updateCalculation,
    deleteCalculation
};
