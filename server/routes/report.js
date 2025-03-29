const router = require("express").Router();
const validator = require("email-validator");

let Report = require("../models/Report");

router.route("/add").post(async (req, res) => {
  const patientName = req.body.patientName;
  const patientEmail = req.body.patientEmail;
  const doctorName = req.body.doctorName;
  const doctorEmail = req.body.doctorEmail;
  const patientAge = Number(req.body.patientAge);
  const notes = req.body.notes;
  const reportURL = req.body.reportURL;
  const prescriptionURL = "";
  let id = 100;
  let max = 100;
  const status = "Pending";
  const reports = await Report.find({});

  if (patientName.length < 2) {
    return res.json({ status: "error", error: "Invalid patient name" });
  }
  if (!validator.validate(patientEmail.toLowerCase())) {
    return res.json({ status: "error", error: "Invalid patient email" });
  }
  if (doctorName.length < 2) {
    return res.json({ status: "error", error: "Invalid doctor name" });
  }
  if (!validator.validate(doctorEmail.toLowerCase())) {
    return res.json({ status: "error", error: "Invalid doctor email" });
  }
  if (isNaN(patientAge)) {
    return res.json({ status: "error", error: "Invalid patient age" });
  }
  if (reportURL.length < 1) {
    return res.json({ status: "error", error: "Invalid report" });
  }

  if (reports) {
    reports.map((report, index) => {
      if (index === 0) {
        max = report.id;
      }

      if (max < report.id) {
        max = report.id;
      }
    });

    id = max + 1;
  }

  try {
    const newReport = new Report({
      id,
      patientName,
      patientEmail,
      doctorName,
      doctorEmail,
      patientAge,
      notes,
      status,
      reportURL,
      prescriptionURL,
    });

    newReport.save().then(() => {
      res.json({ status: "ok", reportId: id });
    });
  } catch (error) {
    console.log(error.message);
  }
});

router.route("/get/:id").get(async (req, res) => {
  let id = req.params.id;

  const report = await Report.find({
    patientEmail: id,
  });

  if (report) {
    return res.json({ status: "Found Reports", report: report });
  } else {
    return res.json({ status: "No Reports" });
  }
});

router.route("/get-reports/:id").get(async (req, res) => {
  let id = req.params.id;

  const report = await Report.find({
    doctorEmail: id,
  });

  if (report) {
    return res.json({ status: "Found Reports", report: report });
  } else {
    return res.json({ status: "No Reports" });
  }
});

router.route("/update/:id").put(async (req, res) => {
  const id = req.body.id;
  const prescriptionURL = req.body.reportURL;

  try {
    const updateReport = {
      status: "Reviewed",
      prescriptionURL: prescriptionURL,
    };

    await Report.findOneAndUpdate(id, updateReport).then(() => {
      res.json({ status: "Prescription added" });
    });
  } catch (error) {
    console.log(error.message);
  }
});

router.route("/update/prescription-upload/:id").put(async (req, res) => {
  const id = req.body.id;
  const reportURL = req.body.reportURL;

  try {
    const updateReport = {
      status: "Reviewed",
      prescriptionURL: reportURL,
    };

    await Report.findOneAndUpdate(id, updateReport).then(() => {
      res.json({ status: "Prescription updated" });
    });
  } catch (error) {
    console.log(error.message);
  }
});

router.route("/change/:id").put(async (req, res) => {
  const id = req.body.id;
  const reportURL = req.body.reportURL;
  const age = req.body.patientAge;
  const notes = req.body.notes;

  try {
    const updateReport = {
      patientAge: age,
      notes: notes,
      reportURL: reportURL,
    };

    await Report.findOneAndUpdate({ id: id }, updateReport).then(() => {
      res.json({ status: "Report updated" });
    });
  } catch (error) {
    console.log(error.message);
  }
});

router.route("/delete/prescription/:id").put(async (req, res) => {
  const id = req.body.id;

  try {
    const updateReport = {
      prescriptionURL: "",
      status: "Pending",
    };

    await Report.findOneAndUpdate(id, updateReport).then(() => {
      res.json({ status: "Prescription Deleted" });
    });
  } catch (error) {
    console.log(error.message);
  }
});

router.route("/delete/:id").delete(async (req, res) => {
  const id = req.params.id;

  await Report.findByIdAndRemove(id)
    .then(() => {
      res.status(200).send({ status: "Report deleted" });
    })
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .send({ status: "Error with delete report", error: err.message });
    });
});

router.route("/prescription/delete/:id").delete(async (req, res) => {
  const id = req.params.id;

  await Report.findByIdAndRemove(id)
    .then(() => {
      res.status(200).send({ status: "Report deleted" });
    })
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .send({ status: "Error with delete report", error: err.message });
    });
});

module.exports = router;
