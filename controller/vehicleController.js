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


module.exports = { 
    getAllVehicleData , addDataVechiles
}
