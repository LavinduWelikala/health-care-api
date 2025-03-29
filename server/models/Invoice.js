const mongoose = require('mongoose');

const invoiceSchema = new mongoose.Schema({

 
  patientName: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  invoiceNumber: {
    type: String,
    required: true
  },
  paymentType: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  contactNumber: {
    type: String,
    required: true
  },
  medicineName: {
    type: String,
    required: true
  },
  quantity: {
    type: String,
    required: true
  },
  mrp: {
    type: String,
    required: true
  },
  total: {
    type: String,
    required: true
  },

});

const Invoice= mongoose.model("Invoice",invoiceSchema);

module.exports = Invoice;
