const router = require("express").Router();
const validator = require("email-validator");

let Specialist = require("../models/Specialist");

router.route("/add").post((req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const nic = req.body.nic;
  const specialization = req.body.specialization;
  const experience = Number(req.body.experience);
  // const photoURL = req.body.photoURL;

  if (name.length < 2) {
    return res.json({ status: "error", error: "Invalid name" });
  }
  if (!validator.validate(email.toLowerCase())) {
    return res.json({ status: "error", error: "Invalid email" });
  }
  if (!/^([0-9]{9}[x|X|v|V]|[0-9]{12})$/i.test(nic)) {
    return res.json({ status: "error", error: "Invalid nic" });
  }
  if (specialization.length < 1) {
    return res.json({ status: "error", error: "Invalid specialization" });
  }
  if (experience.length < 1) {
    return res.json({ status: "error", error: "Invalid experience" });
  }

  try {
    const newSpecialist = new Specialist({
      name,
      email,
      nic,
      specialization,
      experience,
      // photoURL,
    });

    newSpecialist.save().then(() => {
      res.json({ status: "ok" });
    });
  } catch (error) {
    console.log(error.message);
  }
});

router.route("/all-details").get(async (req, res) => {
  const staff = await Specialist.find({});

  if (staff) {
    res.json(staff);
  } else {
    res.send("No data found");
  }
});

router.route("/delete/:id").delete(async (req, res) => {
  const id = req.params.id;

  await Specialist.findByIdAndRemove(id)
    .then(() => {
      res.status(200).send({ status: "User deleted" });
    })
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .send({ status: "Error with delete user", error: err.message });
    });
});

router.route("/update/:id").put(async (req, res) => {
  const id = req.body.id;
  const name = req.body.name;
  const specialization = req.body.specialization;
  const experience = req.body.experience;

  if (name.length < 2) {
    return res.json({ status: "error", error: "Invalid name" });
  }
  if (specialization.length < 1) {
    return res.json({ status: "error", error: "Invalid specialization" });
  }
  if (experience.length < 1) {
    return res.json({ status: "error", error: "Invalid experience" });
  }

  try {
    const updateStaff = {
      name,
      specialization,
      experience,
    };

    await Specialist.findByIdAndUpdate(id, updateStaff).then(() => {
      res.json({ status: "Specialist updated" });
    });
  } catch (error) {
    console.log(error.message);
  }
});

router.route("/get/:id").get(async (req, res) => {
  let id = req.params.id;

  const specialist = await Specialist.findOne({
    name: id,
  });

  if (specialist) {
    return res.json({ status: "Found User", specialist: specialist });
  } else {
    return res.json({ status: "NotFound User" });
  }
});

module.exports = router;
