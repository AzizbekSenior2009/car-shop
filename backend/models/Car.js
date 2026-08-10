const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
  make: { type: String, required: true },
  model: { type: String, required: true },
  year: { type: Number, required: true },
  mileage: { type: String, required: true },
  price: { type: String, required: true },
  image: { type: String, required: true },
  description: {
    en: { type: String },
    uz: { type: String },
    ru: { type: String }
  },
  exterior: [{ type: String }],
  interior: [{ type: String }],
  isFeatured: { type: Boolean, default: false },
  status: { type: String, default: 'Available' } // "Available", "Sold", "Reserved"
}, {
  timestamps: true
});

module.exports = mongoose.model('Car', carSchema);
