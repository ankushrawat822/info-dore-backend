const mongoose = require('mongoose');


const feedbackSchema = new mongoose.Schema({

   userEmail : {
      required : true,
      type : String,
       trim : true
   },
   feedbackMessage: {
      required: true,
      type: String,
      trim: true
  },
   
   department : {
      required : true ,
     type : String 
   } , 

   suggestion : {
      type : String
   },

   status: {
        type: String,
        default: 'Pending',
        enum: ['Pending', 'In_progress', 'Resolved']
    },
   
}
 , {    timestamps: true });

const Feedback = mongoose.model('Feedback', feedbackSchema);

module.exports = Feedback;
