const Farm = require('../models/farm.model');

const createFarmController = async (req, res) => {
    try {
        const { user_id, name, location, latitude, longitude, total_hectares, planting_date, expected_harvest_date, status } = req.body;
        
        const newFarm = await Farm.create({
            user_id,
            name,
            location,
            latitude,
            longitude,
            total_hectares,
            planting_date,
            expected_harvest_date,
            status
        });
        
        return res.status(201).json({
            message: 'Granja creada exitosamente',
            data: newFarm
        });
    } catch (error) {
        console.error('Error en createFarmController:', error.message);
        return res.status(500).json({ message: error.message });
    }
};

const getAllFarmsController = async (req, res) => {
    try {
        const farms = await Farm.findAll();
        
        return res.status(200).json({
            message: 'Granjas obtenidas exitosamente',
            data: farms
        });
    } catch (error) {
        console.error('Error en getAllFarmsController:', error.message);
        return res.status(500).json({ message: error.message });
    }
};

const getFarmByIdController = async (req, res) => {
    try {
        const { id } = req.params;
        
        const farm = await Farm.findByPk(id);
        
        if (!farm) {
            return res.status(404).json({ message: 'Granja no encontrada' });
        }
        
        return res.status(200).json({
            message: 'Granja obtenida exitosamente',
            data: farm
        });
    } catch (error) {
        console.error('Error en getFarmByIdController:', error.message);
        return res.status(500).json({ message: error.message });
    }
};

const getFarmsByUserController = async (req, res) => {
    try {
        const { userId } = req.params;
        
        const farms = await Farm.findAll({
            where: { user_id: userId }
        });
        
        return res.status(200).json({
            message: 'Granjas del usuario obtenidas exitosamente',
            data: farms
        });
    } catch (error) {
        console.error('Error en getFarmsByUserController:', error.message);
        return res.status(500).json({ message: error.message });
    }
};

const updateFarmController = async (req, res) => {
    try {
        const { id } = req.params;
        const farmData = req.body;
        
        const farm = await Farm.findByPk(id);
        
        if (!farm) {
            return res.status(404).json({ message: 'Granja no encontrada' });
        }
        
        await farm.update(farmData);
        
        return res.status(200).json({
            message: 'Granja actualizada exitosamente',
            data: farm
        });
    } catch (error) {
        console.error('Error en updateFarmController:', error.message);
        return res.status(500).json({ message: error.message });
    }
};

const deleteFarmController = async (req, res) => {
    try {
        const { id } = req.params;
        
        const farm = await Farm.findByPk(id);
        
        if (!farm) {
            return res.status(404).json({ message: 'Granja no encontrada' });
        }
        
        await farm.destroy();
        
        return res.status(200).json({
            message: 'Granja eliminada exitosamente'
        });
    } catch (error) {
        console.error('Error en deleteFarmController:', error.message);
        return res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createFarmController,
    getAllFarmsController,
    getFarmByIdController,
    getFarmsByUserController,
    updateFarmController,
    deleteFarmController
};