const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const pharmacistSchema = new Schema({
  
  name: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  gender: {
    type: String,
    required: true
  },
  contact: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  doctor: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  }
});

const Pharmacist = mongoose.model("Pharmacist", pharmacistSchema);

module.exports = Pharmacist;
