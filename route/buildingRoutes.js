const express = require('express');
const { getAllBuildingData, addBuildingData, updateBuilding } = require('../controller/buildingController');

const router = express.Router();

// Get all vehicles
router.get('/buildings', getAllBuildingData );

router.post('/add-buildings', addBuildingData );

router.put('/update-building/:id', updateBuilding);

// router.put('/update-allocation' , updateVehicleAllocations)

module.exports = router;