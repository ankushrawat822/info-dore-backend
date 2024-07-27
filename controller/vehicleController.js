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
    const { vehicles } = req.body; // Expecting an array of objects with vehicle ID and allocation

    if (!Array.isArray(vehicles)) {
      return res.status(400).json({ message: 'Invalid input, expected an array of vehicles' });
    }

    try {
        const bulkOps = vehicles.map(vehicle => {
            return {
              updateOne: {
                filter: { _id: vehicle._id }, // Assuming vehicle ID is passed in the body
                update: { $set: { allocation: vehicle.allocation } },
                upsert: false // Do not insert if the document doesn't exist
              }
            };
          });
      
          if (bulkOps.length === 0) {
            return res.status(400).json({ message: 'No vehicles to update' });
          }
      
          const result = await Vehicle.bulkWrite(bulkOps);
      
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
