const mongoose = require('mongoose');

const EnquirySchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String },
  message: { type: String },
  carName: { type: String }, // For a specific car enquiry
  cars: [{ type: String }],  // For a cart checkout enquiry
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Enquiry', EnquirySchema);
