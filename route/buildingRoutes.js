const express = require('express');
const { getAllBuildingData, addBuildingData } = require('../controller/buildingController');

const router = express.Router();

// Get all vehicles
router.get('/buildings', getAllBuildingData );

router.post('/add-buildings', addBuildingData );

// router.put('/update-allocation' , updateVehicleAllocations)

module.exports = router;