const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");

const app = express();
require("dotenv").config();

const PORT = process.env.PORT || 8070;

app.use(cors());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(bodyParser.json());

const URL = process.env.MONGODB_URL;

mongoose.connect(URL);

const connection = mongoose.connection;

connection.once("open", () => {
  console.log("MongoDB connection success!");
});

const userRouter = require("./routes/user.js");

app.use("/user", userRouter);

const specialistRouter = require("./routes/specialists.js");

app.use("/specialist", specialistRouter);

const staffRouter = require("./routes/staff.js");

app.use("/staff", staffRouter);

const reportRouter = require("./routes/report.js");

app.use("/report", reportRouter);

const appointmentRouter = require("./routes/appointments.js");

app.use("/appointment", appointmentRouter);

const pharmacistRouter = require("./routes/pharmacists.js");
const invoiceRouter = require("./routes/invoices.js");
const medicineRouter = require("./routes/medicines.js");

app.use("/pharmacist", pharmacistRouter);
app.use("/invoice", invoiceRouter);
app.use("/medicine", medicineRouter);

const scheduleRouter = require("./routes/schedules.js");

app.use("/schedule", scheduleRouter);

const goalsRouter = require("./routes/goals.js");

app.use("/goals", goalsRouter);

const ticketRouter = require("./routes/Ticket.js");

app.use("/ticket", ticketRouter);

const quizRouter = require("./routes/quiz.js");
app.use("/quiz", quizRouter);

const paymentRouter = require("./routes/ipayments.js");
app.use("/ipayments", paymentRouter);

app.listen(PORT, () => {
  console.log(`Server is up and running on port number : ${PORT}`);
});
