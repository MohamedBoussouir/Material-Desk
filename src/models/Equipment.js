const mongoose = require('mongoose');

const equipmentSchema = new mongoose.Schema({
  assetTag: {
    type: String,
    required: true,
    unique: true,
    uppercase: true,
    trim: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: String,
    required: true,
    enum: ['video', 'audio', 'informatique']
  },
  dailyLateFeeCents: {
    type: Number,
    required: true,
    min: 0
  },
  isArchived: {
    type: Boolean,
    default: false,
    immutable: true
  },
  checkoutCount: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true 
});

const Equipment = mongoose.model('Equipment', equipmentSchema);

module.exports = Equipment;