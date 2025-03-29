const router = require("express").Router();
const validator = require("email-validator");

let Staff = require("../models/Staff");

router.route("/add").post((req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const nic = req.body.nic;
  const role = req.body.role;
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
  if (role.length < 2) {
    return res.json({ status: "error", error: "Invalid role" });
  }

  try {
    const newStaff = new Staff({
      name,
      email,
      nic,
      role,
      // photoURL,
    });

    newStaff.save().then(() => {
      res.json({ status: "ok" });
    });
  } catch (error) {
    console.log(error.message);
  }
});

router.route("/all-details").get(async (req, res) => {
  const staff = await Staff.find({});

  if (staff) {
    res.json(staff);
  } else {
    res.send("No data found");
  }
});

router.route("/delete/:id").delete(async (req, res) => {
  const id = req.params.id;

  await Staff.findByIdAndRemove(id)
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

  if (name.length < 2) {
    return res.json({ status: "error", error: "Invalid name" });
  }

  try {
    const updateStaff = {
      name,
    };

    await Staff.findByIdAndUpdate(id, updateStaff).then(() => {
      res.json({ status: "Staff updated" });
    });
  } catch (error) {
    console.log(error.message);
  }
});

router.route("/get/:id").get(async (req, res) => {
  let id = req.params.id;

  const staff = await Staff.findOne({
    name: id,
  });

  if (staff) {
    return res.json({ status: "Found User", staff: staff });
  } else {
    return res.json({ status: "NotFound User" });
  }
});

module.exports = router;
