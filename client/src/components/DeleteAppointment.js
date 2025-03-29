import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function DeleteAppointment() {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [patientName, setPatientName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [doctorName, setDoctorName] = useState("");
  const [appointmentDate, setAppointmentDate] = useState("");
  const [appointmentTime, setAppointmentTime] = useState("");

  const handleDelete = async (event) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this appointment?"
    );
    if (confirmed) {
      setLoading(true);
      try {
        await axios.delete(`http://localhost:8070/appointment/delete/${id}`);
        setLoading(false);
        window.location = "/admin/appointment";
      } catch (err) {
        setError(err.response.data.error);
      }
    } else {
      event.preventDefault();
      window.location = "/admin/appointment";
    }
  };

  useEffect(() => {
    const showAppointment = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8070/appointment/get/${id}`
        );
        if (response.status === 200) {
          setPatientName(response.data.appointment.patientName);
          setEmail(response.data.appointment.email);
          setPhone(response.data.appointment.phone);
          setDoctorName(response.data.appointment.doctorName);
          setAppointmentDate(response.data.appointment.appointmentDate);
          setAppointmentTime(response.data.appointment.appointmentTime);
        }
      } catch (err) {
        console.log(err);
      }
    };
    showAppointment();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="container-app">
      <form onSubmit={handleDelete} className="make-appointment-page">
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
            disabled
            type="text"
            name="patientName"
            className="form-control"
            value={patientName}
          />
        </div>

        <div className="mb-3">
          <label for="email" className="form-label">
            Email
          </label>
          <input
            type="text"
            disabled
            name="email"
            className="form-control"
            value={email}
          />
        </div>

        <div className="mb-3">
          <label for="phone" className="form-label">
            Phone Number
          </label>
          <input
            disabled
            type="text"
            name="phone"
            className="form-control"
            value={phone}
          />
        </div>

        <div className="mb-3">
          <label for="dname" className="form-label">
            Doctor Name
          </label>
          <input
            disabled
            type="text"
            name="doctorName"
            className="form-control"
            value={doctorName}
          />
        </div>

        <div className="mb-3">
          <label for="date" className="form-label">
            Appointment Date
          </label>

          <input
            disabled
            type="text"
            name="appointmentDate"
            className="form-control"
            value={appointmentDate}
          />
        </div>

        <div className="mb-3">
          <label for="tiem" className="form-label">
            Appointment Time
          </label>
          <input
            disabled
            type="text"
            name="appointmentTime"
            className="form-control"
            value={appointmentTime}
          />
        </div>

        <button type="submit" className="btn btn-danger">
          Delete
        </button>
      </form>
         
    </div>
  );
}
