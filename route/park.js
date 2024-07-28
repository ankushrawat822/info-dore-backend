const express = require('express');
const { getAllParks, addPark} = require('../controller/park.js');


const router = express.Router();

// Get all vehicles
router.get('/parks', getAllParks );

router.post('/add-park', addPark );

module.exports = router;