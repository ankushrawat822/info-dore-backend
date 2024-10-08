const express = require('express');
const { getAllBuildingData, addBuildingData, updateBuilding, getBuildingLongitudeAndLatitude } = require('../controller/buildingController');

const router = express.Router();

// Get all vehicles
router.get('/buildings', getAllBuildingData );

router.get('/add-lat-long' , getBuildingLongitudeAndLatitude);

router.post('/add-buildings', addBuildingData );

router.put('/update-building/:id', updateBuilding);

// router.put('/update-allocation' , updateVehicleAllocations)

module.exports = router;