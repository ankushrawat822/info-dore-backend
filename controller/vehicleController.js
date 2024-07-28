const Vehicle = require("../model/vehiclesModel.js")

const getAllVehicleData = async(req , res)=>{
   
    try {
        const vehicles = await Vehicle.find();
       
      res.status(200).json(vehicles);
        
    } catch (error) {
        res.status(500).json({ message: "Error fetching vehicles", error: error.message });
        console.log(error)
    }
}



// calculate data
const calculateVehicleMetrics = (vehicleData) => {
    const currentDate = new Date();
    const lastMaintenanceDate = new Date(vehicleData.lastMaintenance);
    const vehicleAge = currentDate.getFullYear() - vehicleData.year;
  
    // Assume maintenance is required every 6 months or 5000 km, whichever comes first
    const maintenanceInterval = 6 * 30 * 24 * 60 * 60 * 1000; // 6 months in milliseconds
    const mileageInterval = 5000;
  
    // Calculate maintenance progress
    const timeSinceLastMaintenance = currentDate - lastMaintenanceDate;
    const timeProgress = (timeSinceLastMaintenance / maintenanceInterval) * 100;
    const mileageProgress = (vehicleData.mileage % mileageInterval) / mileageInterval * 100;
    const maintenanceProgress = Math.min(Math.max(timeProgress, mileageProgress), 100) * 10;
  
    // Calculate next maintenance date
    const nextMaintenanceDate = new Date(lastMaintenanceDate.getTime() + maintenanceInterval);
  
    // Calculate fuel efficiency (in km/l)
    // Assume base efficiency of 3 km/l for garbage trucks and 10 km/l for cars
    const baseFuelEfficiency = vehicleData.type === 'Garbage Truck' ? 3 : 10;
    const fuelEfficiency = baseFuelEfficiency * (1 - (vehicleAge * 0.01)) * 10;
  
    return {
      nextMaintenance: nextMaintenanceDate,
      maintenanceProgress: maintenanceProgress ,
      fuelEfficiency: fuelEfficiency
    };
  };
  

  const addDataVechiles = async (req, res) => {
    try {
      const vehicleData = req.body;
      
      // Calculate metrics
      const { nextMaintenance, maintenanceProgress, fuelEfficiency } = calculateVehicleMetrics(vehicleData);
      
      // Add calculated fields to vehicleData
      vehicleData.nextMaintenance = nextMaintenance;
      vehicleData.maintenanceProgress = maintenanceProgress;
      vehicleData.fuelEfficiency = fuelEfficiency;
  
      // Create and save the new vehicle
      const vehicle = new Vehicle(vehicleData);
      await vehicle.save();
  
      res.status(201).json(vehicle);
    } catch (error) {
      res.status(500).json({ message: "Error adding vehicle", error: error.message });
      console.log(error);
    }
  };

const updateVehicleAllocations = async ( req , res )=>{
    const { vehicleIds, allocation } = req.body; 
    allocation.isAllocation = true;
    // Expecting an array of vehicle IDs and a single allocation object

    if (!Array.isArray(vehicleIds) || typeof allocation !== 'object') {
      return res.status(400).json({ message: 'Invalid input, expected an array of vehicle IDs and an allocation object' });
    }
  

    try {
        const result = await Vehicle.updateMany(
            { _id: { $in: vehicleIds } },
            { $set: { allocation: allocation,  status: 'Active'  } },
           
          );
      
          res.status(200).json({
            message: `${result.modifiedCount} vehicle(s) updated successfully`,
            result
          });
      
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error updating vehicle allocations', error: error.message });
    }
  
}



// update 

module.exports = { 
    getAllVehicleData , addDataVechiles , updateVehicleAllocations
}
