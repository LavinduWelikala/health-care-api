const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const staffSchema = new Schema(
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
    role: {
      type: String,
      required: true,
    },
    photoURL: {
      type: String,
    },
  },
  { collection: "staff" }
);

const Staff = mongoose.model("Staff", staffSchema);
module.exports = Staff;
