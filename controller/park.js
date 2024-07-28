const Park = require('../model/park.js'); // adjust the path as necessary

// Controller function to get all park data
const getAllParks = async (req, res) => {
  try {
    const parks = await Park.find();
    res.status(200).json(parks);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching parks', error });
  }
};

const addPark = async (req, res) => {
    const { name, location, size, establishedYear, lastMaintenance, nextInspection, greenScore, status } = req.body;
  
    // Create a new Park instance with the provided data
    const newPark = new Park({
      name,
      location,
      size,
      establishedYear,
      lastMaintenance,
      nextInspection,
      greenScore,
      status
    });
  
    try {
      // Save the new park to the database
      const savedPark = await newPark.save();
      res.status(201).json(savedPark);
    } catch (error) {
      res.status(500).json({ message: 'Error adding park', error });
    }
  };
  

module.exports = {
  getAllParks, addPark
};