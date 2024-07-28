const Feedback = require('../model/feedback'); // adjust the path as necessary

// Controller function to get all feedback
const getAllFeedback = async (req, res) => {
  try {
    const feedbacks = await Feedback.find();
    res.status(200).json(feedbacks);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching feedback', error });
  }
};


// Controller function to add feedback
const addFeedback = async (req, res) => {
    const { userEmail, feedbackMessage, department, suggestion } = req.body;
  
    // Create a new Feedback instance with the provided data
    const newFeedback = new Feedback({
      userEmail,
      feedbackMessage,
      department,
      suggestion
    });
  
    try {
      // Save the new feedback to the database
      const savedFeedback = await newFeedback.save();
      res.status(201).json(savedFeedback);
    } catch (error) {
      res.status(500).json({ message: 'Error adding feedback', error });
    }
  };

module.exports = {
  getAllFeedback, addFeedback
};