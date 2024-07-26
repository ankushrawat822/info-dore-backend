const express = require('express');
const { getAllVehicleData, addDataVechiles } = require('../controller/vehicleController');
const router = express.Router();

// Get all vehicles
router.get('/vehicles', getAllVehicleData );

router.post('/add-vehicles', addDataVechiles );

module.exports = router;