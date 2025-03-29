import React from "react";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

export default function UpdateAppointment() {
  const { id } = useParams();

  const [patientName, setPatientName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [doctorName, setDoctorName] = useState("");
  const [appointmentDate, setAppointmentDate] = useState("");
  const [appointmentTime, setAppointmentTime] = useState("");

  useEffect(() => {
    async function fetchAppointment() {
      try {
        const response = await axios.get(
          `http://localhost:8070/appointment/get/${id}`
        );
        setPatientName(response.data.appointment.patientName);
        setEmail(response.data.appointment.email);
        setPhone(response.data.appointment.phone);
        setDoctorName(response.data.appointment.doctorName);
        setAppointmentDate(response.data.appointment.appointmentDate);
        setAppointmentTime(response.data.appointment.appointmentTime);
      } catch (err) {
        console.log(err);
      }
    }
    fetchAppointment();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const appointment = {
      patientName,
      email,
      phone,
      doctorName,
      appointmentDate,
      appointmentTime,
    };

    console.log(appointment);

    try {
      await axios.put(
        `http://localhost:8070/appointment/update/${id}`,
        appointment
      );
      alert("Appointment updated successfully!");
      window.location = "/admin/appointment";
    } catch (err) {
      console.log(err);
    }
  };

  if (!id) {
    return <div>No appointment found.</div>;
  }

  return (
    <div className="container-app">
      <form onSubmit={handleSubmit} className="make-appointment-page">
        {/* <div className="mb-3">
                <label for="id" className="form-label">ID</label>
                <input
                    type="text"
                    name="_id"
                    className="form-control"
                    value={id}
                    disabled
                />
            </div> */}
        <div className="mb-3">
          <label for="pname" className="form-label">
            Patient Name
          </label>
          <input
            type="text"
            name="patientName"
            className="form-control"
            value={patientName}
            onChange={(event) => setPatientName(event.target.value)}
          />
        </div>

        <div className="mb-3">
          <label for="email" className="form-label">
            Email
          </label>
          <input
            type="text"
            name="email"
            className="form-control"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>

        <div className="mb-3">
          <label for="phone" className="form-label">
            Phone Number
          </label>
          <input
            type="text"
            name="phone"
            className="form-control"
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
          />
        </div>

        <div className="mb-3">
          <label for="dname" className="form-label">
            Doctor Name
          </label>
          <input
            type="text"
            name="doctorName"
            className="form-control"
            value={doctorName}
            onChange={(event) => setDoctorName(event.target.value)}
          />
        </div>

        <div className="mb-3">
          <label for="date" className="form-label">
            Appointment Date
          </label>

          <input
            type="text"
            name="appointmentDate"
            className="form-control"
            value={appointmentDate}
            onChange={(event) => setAppointmentDate(event.target.value)}
          />
        </div>

        <div className="mb-3">
          <label for="tiem" className="form-label">
            Appointment Time
          </label>
          <input
            type="text"
            name="appointmentTime"
            className="form-control"
            value={appointmentTime}
            onChange={(event) => setAppointmentTime(event.target.value)}
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Update
        </button>
      </form>
    </div>
  );
}
