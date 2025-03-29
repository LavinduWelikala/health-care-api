const router = require("express").Router();
const validator = require("email-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
let User = require("../models/User");

// user registration
router.route("/register").post(async (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
  const confirmPassword = req.body.confirmPassword;

  // server-side registration form validation
  if (name.length < 2) {
    return res.json({ status: "error", error: "Invalid name" });
  }
  if (!validator.validate(email.toLowerCase())) {
    return res.json({ status: "error", error: "Invalid email" });
  }
  if (password.length < 5) {
    return res.json({ status: "error", error: "Invalid password" });
  }
  if (!(password === confirmPassword)) {
    return res.json({ status: "error", error: "Password does not match" });
  }

  // create new user
  try {
    // hashing password
    const newPassword = await bcrypt.hash(req.body.password, 10);

    await User.create({
      name: req.body.name,
      email: req.body.email,
      password: newPassword,
      role: "user",
    });

    res.json({ status: "ok" });
  } catch (error) {
    res.json({ status: "error", error: "Error! Email already exists" });
  }
});

// user login
router.route("/login").post(async (req, res) => {
  const email = req.body.username;
  const password = req.body.userPassword;

  // server-side registration form validation
  if (!validator.validate(email.toLowerCase())) {
    return res.json({ status: "error", error: "Invalid email" });
  }
  if (password.length < 5) {
    return res.json({ status: "error", error: "Invalid password" });
  }

  const user = await User.findOne({
    email: email,
  });

  if (!user) {
    return res.json({ status: "error", error: "User not found" });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (isPasswordValid) {
    const token = jwt.sign(
      {
        email: user.email,
        role: user.role,
        name: user.name,
      },
      "Secret123!"
    );
    return res.json({ status: "ok", user: token });
  } else {
    return res.json({
      status: "error",
      error: "Incorrect Password",
      user: false,
    });
  }
});

// user registration
router.route("/staff/register").post(async (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const role = req.body.role;
  const password = req.body.password;

  // server-side registration form validation
  if (name.length < 2) {
    return res.json({ status: "error", error: "Invalid name" });
  }
  if (!validator.validate(email.toLowerCase())) {
    return res.json({ status: "error", error: "Invalid email" });
  }
  if (password.length < 5) {
    return res.json({ status: "error", error: "Invalid password" });
  }

  // create new user
  try {
    // hashing password
    const newPassword = await bcrypt.hash(req.body.password, 10);

    await User.create({
      name: req.body.name,
      email: req.body.email,
      password: newPassword,
      role: role,
    });

    res.json({ status: "ok" });
  } catch (error) {
    res.json({ status: "error", error: "Error! Email already exists" });
  }
});

// user registration
router.route("/doctor/register").post(async (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;

  // server-side registration form validation
  if (name.length < 2) {
    return res.json({ status: "error", error: "Invalid name" });
  }
  if (!validator.validate(email.toLowerCase())) {
    return res.json({ status: "error", error: "Invalid email" });
  }
  if (password.length < 5) {
    return res.json({ status: "error", error: "Invalid password" });
  }

  // create new user
  try {
    // hashing password
    const newPassword = await bcrypt.hash(req.body.password, 10);

    await User.create({
      name: req.body.name,
      email: req.body.email,
      password: newPassword,
      role: "doctor",
    });

    res.json({ status: "ok" });
  } catch (error) {
    res.json({ status: "error", error: "Error! Email already exists" });
  }
});

router.route("/all-details").get(async (req, res) => {
  const users = await User.find({});

  let adminCount = 0;
  let userCount = 0;
  let doctorCount = 0;
  let pharmacistCount = 0;
  let supportAgentCount = 0;

  if (users) {
    users.map((user) => {
      if (user.role === "admin") {
        adminCount = adminCount + 1;
      }
      if (user.role === "doctor") {
        doctorCount = doctorCount + 1;
      }
      if (user.role === "pharmacist") {
        pharmacistCount = pharmacistCount + 1;
      }
      if (user.role === "support agent") {
        supportAgentCount = supportAgentCount + 1;
      }
      if (user.role === "user") {
        userCount = userCount + 1;
      }
    });
    res.json({
      couunt: [
        adminCount,
        doctorCount,
        pharmacistCount,
        supportAgentCount,
        userCount,
      ],
    });
  } else {
    res.send("No data found");
  }
});

module.exports = router;
