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


const addDataVechiles = async(req , res)=>{
   
    try {
        const vehicle = new Vehicle(req.body);
        await vehicle.save();
        res.status(201).json(vehicle);
        
    } catch (error) {
        res.status(500).json({ message: "Error adding vehicles", error: error.message });
        console.log(error)
    }
}


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


module.exports = { 
    getAllVehicleData , addDataVechiles , updateVehicleAllocations
}
