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


module.exports = { 
    getAllBuildingData , addBuildingData
}
