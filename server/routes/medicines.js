const router = require("express").Router();
const Medicine = require("../models/Medicine");

// add medicine 
router.route("/add").post(async (req, res) => {
  const medicineName = req.body.medicineName;
  const packing = Number(req.body.packing);
  const expiryDate = Date.parse(req.body.expiryDate);
  const mrp = Number(req.body.mrp);
  
  const newMedicine = new Medicine({
    medicineName,
    packing,
    expiryDate,
    mrp,
  });

  newMedicine
    .save()
    .then(() => {
      res.json("Medicine Added");
    })
    .catch((err) => {
      console.log(err);
    });
});

router.route("/").get((req, res) => {
  Medicine.find()
    .then((medicines) => {
      res.json(medicines);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.route("/update/:id").put(async (req, res) => {
  let medicineId = req.params.id;
  const { medicineName, packing, expiryDate, mrp } = req.body;

  const updateMedicine = {
    medicineName,
    packing,
    expiryDate: Date.parse(expiryDate),
    mrp,
  };

  const update = await Medicine.findByIdAndUpdate(medicineId, updateMedicine)
    .then(() => {
      res.status(200).send({ status: "Medicine updated" });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({ status: "Error with updating data", error: err.message });
    });
});

router.route("/delete/:id").delete(async (req, res) => {
  let medicineId = req.params.id;

  await Medicine.findByIdAndDelete(medicineId)
    .then(() => {
      res.status(200).send({ status: "Medicine deleted" });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({ status: "Error with deleting data", error: err.message });
    });
});

router.route("/get/:id").get(async (req, res) => {
  let medicineId = req.params.id;
  const medicine = await Medicine.findById(medicineId)
    .then((medicine) => {
      res.status(200).json({ status: "Medicine fetched", medicine });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({ status: "Error with getting data", error: err.message });
    });
});

module.exports = router;










  