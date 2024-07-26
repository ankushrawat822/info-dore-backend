const mongoose = require('mongoose');

const vehicleSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  type: {
    type: String,
    required: true,
    enum: ['Car', 'Garbage Truck'],
    trim: true
  },
  make: {
    type: String,
    required: true,
    trim: true
  },
  model: {
    type: String,
    required: true,
    trim: true
  },
  year: {
    type: Number,
    required: true,
    min: 1900,
    max: new Date().getFullYear() + 1
  },
  licensePlate: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  mileage: {
    type: Number,
    required: true,
    min: 0
  },
  lastMaintenance: {
    type: Date,
    required: true
  },
  nextMaintenance: {
    type: Date,
    required: true
  },
  maintenanceProgress: {
    type: Number,
    required: true,
    min: 0,
    max: 100
  },
  fuelEfficiency: {
    type: Number,
    required: true,
    min: 0
  },
  status: {
    type: String,
    required: true,
    enum: ['Active', 'Maintenance', 'Out of Service'],
    default: 'Active'
  }
}, {
  timestamps: true
});

// Create indexes for frequently queried fields
vehicleSchema.index({ type: 1 });
vehicleSchema.index({ status: 1 });
vehicleSchema.index({ nextMaintenance: 1 });

// Virtual for formatting fuel efficiency
vehicleSchema.virtual('formattedFuelEfficiency').get(function() {
  return `${this.fuelEfficiency.toFixed(1)} km/l`;
});

// Method to check if maintenance is due
vehicleSchema.methods.isMaintenanceDue = function() {
  return this.maintenanceProgress >= 100;
};

// Static method to find vehicles due for maintenance
vehicleSchema.statics.findDueForMaintenance = function() {
  return this.find({ maintenanceProgress: { $gte: 100 } });
};

const Vehicle = mongoose.model('Vehicle', vehicleSchema);

module.exports = Vehicle;