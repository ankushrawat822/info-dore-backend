const express = require('express');
const { getAllVehicleData, addDataVechiles, updateVehicleAllocations } = require('../controller/vehicleController');
const router = express.Router();

// Get all vehicles
router.get('/vehicles', getAllVehicleData );

router.post('/add-vehicles', addDataVechiles );

router.put('/update-allocation' , updateVehicleAllocations)

module.exports = router;