const mongoose = require('mongoose');

const accountSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['admin', 'member'],
    required: true,
    default: 'member'
  }
}, {
  timestamps: true 
});

const Account = mongoose.model('Account', accountSchema);

module.exports = Account;