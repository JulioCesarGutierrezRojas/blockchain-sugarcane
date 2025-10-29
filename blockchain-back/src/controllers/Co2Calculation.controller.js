const Co2Calculation = require('../models/co2calculation.model');

// Crear un nuevo cálculo de CO2
const createCo2CalculationController = async (req, res) => {
    try {
        const { farm_id, calculation_date, hectares_measured, co2_captured_tons, calculation_method, stellar_transaction_hash, verification_status } = req.body;
        
        const newCalculation = await Co2Calculation.create({
            farm_id,
            calculation_date,
            hectares_measured,
            co2_captured_tons,
            calculation_method,
            stellar_transaction_hash,
            verification_status
        });
        
        return res.status(201).json({
            message: 'Cálculo de CO2 creado exitosamente',
            data: newCalculation
        });
    } catch (error) {
        console.error('Error en createCo2CalculationController:', error.message);
        return res.status(500).json({ message: error.message });
    }
};

// Obtener todos los cálculos de CO2
const getAllCo2CalculationsController = async (req, res) => {
    try {
        const calculations = await Co2Calculation.findAll();
        
        return res.status(200).json({
            message: 'Cálculos de CO2 obtenidos exitosamente',
            data: calculations
        });
    } catch (error) {
        console.error('Error en getAllCo2CalculationsController:', error.message);
        return res.status(500).json({ message: error.message });
    }
};

// Obtener un cálculo de CO2 por ID
const getCo2CalculationByIdController = async (req, res) => {
    try {
        const { id } = req.params;
        
        const calculation = await Co2Calculation.findByPk(id);
        
        if (!calculation) {
            return res.status(404).json({ message: 'Cálculo de CO2 no encontrado' });
        }
        
        return res.status(200).json({
            message: 'Cálculo de CO2 obtenido exitosamente',
            data: calculation
        });
    } catch (error) {
        console.error('Error en getCo2CalculationByIdController:', error.message);
        return res.status(500).json({ message: error.message });
    }
};

// Obtener cálculos de CO2 por granja
const getCo2CalculationsByFarmController = async (req, res) => {
    try {
        const { farmId } = req.params;
        
        const calculations = await Co2Calculation.findAll({
            where: { farm_id: farmId }
        });
        
        return res.status(200).json({
            message: 'Cálculos de CO2 de la granja obtenidos exitosamente',
            data: calculations
        });
    } catch (error) {
        console.error('Error en getCo2CalculationsByFarmController:', error.message);
        return res.status(500).json({ message: error.message });
    }
};

// Obtener cálculos de CO2 por estado de verificación
const getCo2CalculationsByStatusController = async (req, res) => {
    try {
        const { status } = req.params;
        
        const calculations = await Co2Calculation.findAll({
            where: { verification_status: status }
        });
        
        return res.status(200).json({
            message: `Cálculos de CO2 con estado ${status} obtenidos exitosamente`,
            data: calculations
        });
    } catch (error) {
        console.error('Error en getCo2CalculationsByStatusController:', error.message);
        return res.status(500).json({ message: error.message });
    }
};

// Actualizar un cálculo de CO2
const updateCo2CalculationController = async (req, res) => {
    try {
        const { id } = req.params;
        const calculationData = req.body;
        
        const calculation = await Co2Calculation.findByPk(id);
        
        if (!calculation) {
            return res.status(404).json({ message: 'Cálculo de CO2 no encontrado' });
        }
        
        await calculation.update(calculationData);
        
        return res.status(200).json({
            message: 'Cálculo de CO2 actualizado exitosamente',
            data: calculation
        });
    } catch (error) {
        console.error('Error en updateCo2CalculationController:', error.message);
        return res.status(500).json({ message: error.message });
    }
};

// Eliminar un cálculo de CO2
const deleteCo2CalculationController = async (req, res) => {
    try {
        const { id } = req.params;
        
        const calculation = await Co2Calculation.findByPk(id);
        
        if (!calculation) {
            return res.status(404).json({ message: 'Cálculo de CO2 no encontrado' });
        }
        
        await calculation.destroy();
        
        return res.status(200).json({
            message: 'Cálculo de CO2 eliminado exitosamente'
        });
    } catch (error) {
        console.error('Error en deleteCo2CalculationController:', error.message);
        return res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createCo2CalculationController,
    getAllCo2CalculationsController,
    getCo2CalculationByIdController,
    getCo2CalculationsByFarmController,
    getCo2CalculationsByStatusController,
    updateCo2CalculationController,
    deleteCo2CalculationController
};