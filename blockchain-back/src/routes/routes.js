const express = require('express');
const router = express.Router();
const { loginController, logoutController } = require('../controllers/auth.controller');


const {
    createUserController,
    getAllUsersController,
    getUserByIdController,
    getUserByStellarAddressController,
    getUserByEmailController,
    updateUserController,
    deleteUserController
} = require('../controllers/user.controller');
const farmController = require('../controllers/farm.controller');
const co2CalculationController = require('../controllers/Co2Calculation.controller');


router.post('/login', loginController);
router.post('/logout', logoutController);
// ==================== pa los usuarios ====================
router.post('/users', createUserController);
router.get('/users', getAllUsersController);
router.get('/users/id/:id', getUserByIdController);
router.get('/users/stellar/:stellarAddress', getUserByStellarAddressController);
router.get('/users/email/:email', getUserByEmailController);
router.put('/users/:id', updateUserController);
router.delete('/users/:id', deleteUserController);

// ==================== pa las farms ====================

router.post('/farms', farmController.createFarmController);
router.get('/farms', farmController.getAllFarmsController);
router.get('/farms/:id', farmController.getFarmByIdController);
router.get('/farms/user/:userId', farmController.getFarmsByUserController);
router.put('/farms/:id', farmController.updateFarmController);
router.delete('/farms/:id', farmController.deleteFarmController);

// ==================== pal CO2 ====================

router.post('/co2-calculations', co2CalculationController.createCo2CalculationController);
router.get('/co2-calculations', co2CalculationController.getAllCo2CalculationsController);
router.get('/co2-calculations/:id', co2CalculationController.getCo2CalculationByIdController);
router.get('/co2-calculations/farm/:farmId', co2CalculationController.getCo2CalculationsByFarmController);
router.get('/co2-calculations/status/:status', co2CalculationController.getCo2CalculationsByStatusController);
router.put('/co2-calculations/:id', co2CalculationController.updateCo2CalculationController);
router.delete('/co2-calculations/:id', co2CalculationController.deleteCo2CalculationController);

module.exports = router;
