import React, { useState } from "react";
import "../styles/AppointmentStyle.css";
import axios from "axios";
import NavBar from "./NavBar";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export default function AddAppointment() {
  const [pname, setPname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [dname, setDname] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const errors = {};

    if (!pname.trim()) {
      errors.pname = "Patient name is required";
    }

    if (!email.trim()) {
      errors.email = "Email is required";
    } else if (!isValidEmail(email)) {
      errors.email = "Invalid email address";
    }

    if (!phone.trim()) {
      errors.phone = "Phone number is required";
    } else if (!isValidPhone(phone)) {
      errors.phone = "Invalid phone number";
    }

    if (!dname.trim()) {
      errors.dname = "Doctor name is required";
    }

    if (!date.trim()) {
      errors.date = "Appointment date is required";
    }

    if (!time.trim()) {
      errors.time = "Appointment time is required";
    }

    setErrors(errors);

    return Object.keys(errors).length === 0;
  };

  const isValidEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  const isValidPhone = (phone) => {
    const phonePattern = /^\d{10}$/;
    if(phone.length<10 || phone.length>10){
      return phonePattern.test(phone);}
    return phonePattern.test(phone);
  };

  function sendData(e) {
    e.preventDefault();
  
    const isValid = validateForm();
  
    if (!isValid) {
      return;
    }
  
    const newAppointment = {
      pname,
      email,
      phone,
      dname,
      date,
      time,
    };
  
    axios
      .post("http://localhost:8070/appointment/add", newAppointment)
      .then(() => {
        alert("Appointment Requested");
        window.location.reload(false);
      })
      .catch((err) => {
        alert(err.message);
      });
  }

  return (
    <>
      <NavBar />
      <div>
        <Container className="my-5" style={{ width: "70%" }}>
          <Row className="align-items-center">
            <Col md={12}>
              <h2 className="mb-3">Make your Appointment Here!</h2>
              <p style={{ fontSize: "17px" }}>
                To make your appointment you can select the date and time that
                works best for you. You will also be asked to provide some basic
                information, such as your name, contact information, and reason
                for the appointment. Once you have submitted your appointment
                request, our staff will review it and confirm the appointment
                via email or phone. It's that easy!
              </p>
              <p style={{ fontSize: "17px" }}>
                If you have any questions or need assistance with the
                appointment scheduling process, please don't hesitate to contact
                us via phone or email. Our friendly and knowledgeable staff are
                always available to assist you and ensure that your appointment
                scheduling experience is as smooth and stress-free as possible.
              </p>
            </Col>
          </Row>
        </Container>
      </div>
      <div className="container-app" style={{ marginTop: "-50px" }}>
        <form onSubmit={sendData} className="make-appointment-page">
          <div className="mb-3">
            <label htmlFor="pname" className="form-label">
              Patient Name
            </label>
            <input
              type="text"
              required
              className={`form-control ${errors.pname ? "is-invalid" : ""}`}
              id="pname"
              placeholder="Enter Patient Name"
              value={pname}
              onChange={(e) => setPname(e.target.value)}
            />
            {errors.pname && <div className="invalid-feedback">{errors.pname}</div>}
          </div>

          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              required
              className={`form-control ${errors.email ? "is-invalid" : ""}`}
              id="email"
              placeholder="Enter Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && <div className="invalid-feedback">{errors.email}</div>}
          </div>

          <div className="mb-3">
            <label htmlFor="phone" className="form-label">
              Phone Number
            </label>
            <input
              required
              type="text"
              className={`form-control ${errors.phone ? "is-invalid" : ""}`}
              id="phone"
              placeholder="Enter Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            {errors.phone && <div className="invalid-feedback">{errors.phone}</div>}
          </div>

          <div className="mb-3">
            <label htmlFor="dname" className="form-label">
              Doctor Name
            </label>
            <input
              type="text"
              required
              className={`form-control ${errors.dname ? "is-invalid" : ""}`}
              id="dname"
              placeholder="Enter Doctor Name"
              value={dname}
              onChange={(e) => setDname(e.target.value)}
            />
            {errors.dname && <div className="invalid-feedback">{errors.dname}</div>}
          </div>

          <div className="mb-3">
            <label htmlFor="date" className="form-label">
              Appointment Date
            </label>
            <input
              type="date"
              required
              className={`form-control ${errors.date ? "is-invalid" : ""}`}
              id="date"
              placeholder="Enter Appointment Date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
            {errors.date && <div className="invalid-feedback">{errors.date}</div>}
          </div>

          <div className="mb-3">
            <label htmlFor="time" className="form-label">
              Appointment Time
            </label>
            <input
              type="text"
              required
              className={`form-control ${errors.time ? "is-invalid" : ""}`}
              id="time"
              placeholder="Enter Appointment Time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
            />
            {errors.time && <div className="invalid-feedback">{errors.time}</div>}
          </div>

          <button type="submit" className="btn btn-primary">
            Request
          </button>
        </form>
      </div>
      <footer
        className="py-3"
        style={{
          backgroundColor: "#eef4ed",
          borderTop: "1px solid #ccc",
        }}
      >
        <div className="container">
          <div className="row">
            <div className="col-md-6 text-md-start text-center">
              <p className="mb-1 fw-bold">HCMS © {new Date().getFullYear()}</p>
              <p className="mb-0">Healthcare Management System</p>
            </div>
            <div className="col-md-6 text-md-end text-center">
              <p className="mb-1">📍 123 Main Street, Colombo, Sri Lanka</p>
              <p className="mb-0">
                📞 ‪+94 11 2345678‬ | ✉ <a href="mailto:info@hcms.lk">info@hcms.lk</a>
              </p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}