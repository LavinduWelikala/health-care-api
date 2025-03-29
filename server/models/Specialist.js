const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const specialistSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    nic: {
      type: String,
      required: true,
      unique: true,
    },
    specialization: {
      type: String,
      required: true,
    },
    experience: {
      type: Number,
      required: true,
    },
    photoURL: {
      type: String,
    },
  },
  { collection: "specialist" }
);

const Specialist = mongoose.model("Specialist", specialistSchema);
module.exports = Specialist;
