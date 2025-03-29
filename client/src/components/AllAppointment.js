import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import jsPDF from "jspdf";
import "jspdf-autotable";
import "../styles/AllAppointment.css";

export default function AllAppointment() {
  const [faFileDownload] = useState([]);
  const[docName,setDoctorName]=useState("");
  const [columns] = useState([]);
  const [column, setColumns] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    function getAppointments() {
      axios
        .get("http://localhost:8070/appointment/")
        .then((res) => {
          setColumns(Object.keys(res.data[0]));
          setAppointments(res.data);
        })
        .catch((err) => {
          alert(err.message);
        });
    }
    getAppointments();
  }, []);

  const filteredAppointments = appointments.filter((appointment) =>
    appointment.doctorName.toLowerCase().includes(searchValue.toLowerCase())
  );

  function generateReport() {
    const doc = new jsPDF();

    const columnStyles = {
      0: { columnWidth: 20 },
      1: { columnWidth: 20 }, 
      2: { columnWidth: 20 }, 
      3: { columnWidth: 21 }, 
      4: { columnWidth: 20 }, 
      5: { columnWidth: 20 }, 
      6: { columnWidth: 20 }, 
      7: { columnWidth: 20 }, 
      8: { columnWidth: 15 },
      9: { columnWidth: 10 }, 
    };

    doc.autoTable({
      head: [column],
      body: filteredAppointments.map((appointment) =>
        Object.values(appointment)
      ),
      columnStyles: columnStyles,
    });
    doc.save("appointments_report.pdf");
  }


  if (filteredAppointments.length === 0) {
    return <p>No appointments found</p>;
  }

  return (
    <div style={{ marginTop: "30px", textAlign: "center" }}>
      <h1>All Appointments</h1>
      <div style={{ marginBottom: "20px" }}>
        <div className="search-bar">
          <input
            type="text"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="Search by Doctor Name"
          />
          <FontAwesomeIcon icon={faSearch} className="app-search-icon" />
        </div>
      </div>
      <table className="table-aa" style={{ margin: "auto" }}>
        <thead>
          <tr>
            <th>Patient Name</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>Doctor Name</th>
            <th>Appointment Date</th>
            <th>Appointment Time</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredAppointments.map((appointment, index) => (
            <tr key={index}>
              <td>{appointment.patientName}</td>
              <td>{appointment.email}</td>
              <td>{appointment.phone}</td>
              <td>{appointment.doctorName}</td>
              <td>{appointment.appointmentDate}</td>
              <td>{appointment.appointmentTime}</td>
              <td>
                <Link
                  to={`/update/${appointment._id}`}
                  className="btn btn-sm btn-update"
                >
                  Update
                </Link>
                <Link
                  to={`/delete/${appointment._id}`}
                  className="btn btn-sm ms-1 btn-delete"
                >
                  Delete
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className="app-generate" onClick={generateReport}>
        Download Report
        <FontAwesomeIcon icon={faFileDownload} className="app-report-icon" />
      </button>
    </div>
  );
}

