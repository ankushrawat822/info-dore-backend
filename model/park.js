const mongoose = require('mongoose');

const parkSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    location: {
        type: String,
        required: true,
        trim: true
    },
    size: {
        type: Number,
        required: true,
        min: 0 // size in acres or square meters
    },
    establishedYear: {
        type: Number,
        required: true,
        min: 1800,
        max: new Date().getFullYear()
    },
    lastMaintenance: {
        type: Date,
        required: true
    },
    nextInspection: {
        type: Date,
        required: true
    },
     
    greenScore: {
        type: Number,
        min: 0,
        max: 100,
        default: null
    },
    status: {
        type: String,
        required: true,
        enum: ['Open', 'Closed for Maintenance', 'Seasonal Closure', 'Renovation Needed', 'Under Renovation']
    },
   
}, {
    timestamps: true
});

const Park = mongoose.model('Park', parkSchema);

module.exports = Park;
