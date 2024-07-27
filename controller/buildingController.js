const Building = require("../model/buildingModel.js")

const getAllBuildingData = async(req , res)=>{
   
    try {
        const buildings = await Building.find();
       
      res.status(200).json(buildings);
        
    } catch (error) {
        res.status(500).json({ message: "Error fetching buildings", error: error.message });
        console.log(error)
    }
}

const addBuildingData = async(req , res)=>{
   
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
    getAllBuildingData , addBuildingData , updateBuilding
}
