const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const reportSchema = new Schema(
  {
    id: {
      type: Number,
      unique: true,
    },
    patientName: {
      type: String,
      required: true,
    },
    patientEmail: {
      type: String,
      required: true,
    },
    doctorName: {
      type: String,
      required: true,
    },
    doctorEmail: {
      type: String,
      required: true,
    },
    patientAge: {
      type: Number,
      required: true,
    },
    notes: {
      type: String,
    },
    reportURL: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    prescriptionURL: {
      type: String,
    },
  },
  { collection: "report" }
);

const Report = mongoose.model("Report", reportSchema);
module.exports = Report;
