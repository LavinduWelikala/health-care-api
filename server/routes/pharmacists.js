const router = require("express").Router();
const Pharmacist = require("../models/Pharmacist");

router.route("/add").post((req, res) => {
  
  const name = req.body.name;
  const age = Number(req.body.age);
  const gender = req.body.gender;
  const contact = Number(req.body.contact);
  const address = req.body.address;
  const doctor = req.body.doctor;
  const location = req.body.location;

  const newPharmacist = new Pharmacist({
    
    name,
    age,
    gender,
    contact,
    address,
    doctor,
    location,
  });

  newPharmacist
    .save()
    .then(() => {
      res.json("Pharmacist Added");
    })
    .catch((err) => {
      console.log(err);
    });
});

router.route("/").get((req, res) => {
  Pharmacist.find()
    .then((pharmacists) => {
      res.json(pharmacists);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.route("/update/:id").put(async (req, res) => {
  let userId = req.params.id;
  const { name, age, gender, contact, address, doctor, location } = req.body;

  const updatePharmacist = {
    name,
    age,
    gender,
    contact,
    address,
    doctor,
    location,
  };
  const update = await Pharmacist.findByIdAndUpdate(userId, updatePharmacist)
    .then(() => {
      res.status(200).send({ status: "User updated" });
    })
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .send({ status: "Error with updating data", error: err.message });
    });
});

router.route("/delete/:id").delete(async (req, res) => {
  let userId = req.params.id;

  await Pharmacist.findByIdAndDelete(userId)
    .then(()    => {
      res.status(200).send({ status: "User deleted" });
    })
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .send({ status: "Error with deleting data", error: err.message });
    });
});

router.route("/:id").get(async (req, res) => {
  let userId = req.params.id;
  await Pharmacist.findById(userId)
    .then((pharmacist) => {
      res.json(pharmacist);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({ status: "Error with getting data", error: err });
    });
});

module.exports = router;

