const mongoose = require('mongoose');

const buildingSchema = new mongoose.Schema({

  type: {
    type: String,
    required: true,
    trim: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  address: {
    type: String,
    required: true,
    trim: true
  },
  yearBuilt: {
    type: Number,
    required: true,
    min: 1800,
    max: new Date().getFullYear()
  },
  totalArea: {
    type: Number,
    required: true,
    min: 0
  },
  lastRenovation: {
    type: Date,
    required: true
  },
  nextInspection: {
    type: Date,
    required: true
  },
  maintenanceStatus: {
    type: Number,
    required: true,
    min: 0,
    max: 100
  },
  energyEfficiency: {
    type: String,
    required: true,
    enum: ['A', 'B', 'C', 'D', 'E', 'F']
  },
  occupancyRate: {
    type: Number,
    required: true,
    min: 0,
    max: 100
  },
  status: {
    type: String,
    required: true,
    enum: ['Operational', 'Renovation Needed', 'Under Renovation', 'Seasonal Closure', 'Decommissioned']
  }
}, {
  timestamps: true
});

const Building = mongoose.model('Building', buildingSchema);

module.exports = Building;
