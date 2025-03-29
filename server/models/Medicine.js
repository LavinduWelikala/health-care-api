const mongoose = require('mongoose');



const medicineSchema = new mongoose.Schema({


  medicineName: {
    type: String,
    required: true
  },
  packing: {
    type: String,
    required: true
  },
  expiryDate: {
    type: Date,
    required: true
  },
  mrp: {
    type: String,
    required: true
  },
  
  
});

const Medicine= mongoose.model("Medicine",medicineSchema);

module.exports = Medicine;
  