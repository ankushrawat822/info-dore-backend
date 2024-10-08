const axios = require("axios");
const Building = require("../model/buildingModel.js")




const getBuildingLongitudeAndLatitude = async (req, res) => {

    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    // Function to geocode addresses
    async function geocodeAddresses(buildings) {
        const geocodedBuildings = [];
        for (const building of buildings) {

            const address = `${building.address} Indore , India`;
            try {
                const { data } = await axios.get(`https://us1.locationiq.com/v1/search.php`, {
                    params: {
                        key: process.env.LOCATIONIQ_API_KEY,
                        q: address,
                        format: 'json'
                    }

                });

                if (data.length > 0) {
                    geocodedBuildings.push({
                        ...building,
                        lat: parseFloat(data[0].lat),
                        lng: parseFloat(data[0].lon)
                    });
                } else {
                    console.warn(`No geocode results for address: ${address}`);
                }
            } catch (err) {
                console.error(`Error fetching geocode for address: ${address}`, err);
            }

            await delay(1000);
        }
        // console.log(geocodedBuildings)
        return geocodedBuildings;
    }


    try {
        const buildings = await Building.find();
        console.log(buildings);

        const result = await geocodeAddresses(buildings)
        console.log(result);

        res.status(200).json(result);

    } catch (error) {
        res.status(500).json({ message: "Error fetching buildings", error: error.message });
        console.log(error)
    }
}

const getAllBuildingData = async (req, res) => {

    try {
        const buildings = await Building.find();

        res.status(200).json(buildings);

    } catch (error) {
        res.status(500).json({ message: "Error fetching buildings", error: error.message });
        console.log(error)
    }
}

const addBuildingData = async (req, res) => {

    try {
        const building = new Building(req.body);
        await building.save();
        res.status(201).json(building);

    } catch (error) {
        res.status(500).json({ message: "Error adding building", error: error.message });

        console.log(error)
    }
}


// building controller
const updateBuilding = async (req, res) => {
    try {
        const { id } = req.params;
        const {
            yearBuilt,
            totalArea,
            lastRenovation,
            nextInspection,
            maintenanceStatus,
            energyEfficiency,
            occupancyRate
        } = req.body;

        // Find the building by ID
        const building = await Building.findById(id);

        if (!building) {
            return res.status(404).json({ message: 'Building not found' });
        }

        // Update only the fields that are provided
        if (yearBuilt !== undefined) building.yearBuilt = yearBuilt;
        if (totalArea !== undefined) building.totalArea = totalArea;
        if (lastRenovation !== undefined) building.lastRenovation = new Date(lastRenovation);
        if (nextInspection !== undefined) building.nextInspection = new Date(nextInspection);
        if (maintenanceStatus !== undefined) building.maintenanceStatus = maintenanceStatus;
        if (energyEfficiency !== undefined) building.energyEfficiency = energyEfficiency;
        if (occupancyRate !== undefined) building.occupancyRate = occupancyRate;

        // Validate the updated building
        const validationError = building.validateSync();
        if (validationError) {
            return res.status(400).json({ message: 'Validation failed', errors: validationError.errors });
        }

        // Save the updated building
        const updatedBuilding = await building.save();

        res.json(updatedBuilding);
    } catch (error) {
        res.status(400).json({ message: 'Error updating building', error: error.message });
    }
};


module.exports = {
    getAllBuildingData, addBuildingData, updateBuilding, getBuildingLongitudeAndLatitude
}
