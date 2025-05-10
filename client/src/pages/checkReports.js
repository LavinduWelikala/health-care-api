import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import UploadReports from "../components/UploadReports";

function CheckReports() {
  const [showModal, setShowModal] = useState(false);
  const [staffDetails, setStaffDetails] = useState([]);
  const [doctorName, setDoctorName] = useState();
  const [doctorEmail, setDoctorEmail] = useState();

  useEffect(() => {
    async function fetchSatffData() {
      const response = await fetch(
        "http://localhost:8070/specialist/all-details",
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );
      const data = await response.json();
      setStaffDetails(data);
    }

    fetchSatffData();
  }, []);

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <NavBar />
      <div style={{ flex: "1 0 auto", padding: "20px" }}>
        {staffDetails.map((staffMember, index) => {
          return (
            <div
              className="card"
              style={{ width: "50%", margin: "auto", marginBottom: "20px" }}
              key={index}
            >
              <div className="card-header">{staffMember.name}</div>
              <div className="card-body">
                <h5 className="card-title">
                  {"Specialization: " + staffMember.specialization}
                </h5>
                <h5 className="card-title">
                  {"Experience: " + staffMember.experience}
                </h5>
                <button
                  className="btn btn-primary"
                  onClick={() => {
                    setShowModal(true);
                    setDoctorName(staffMember.name);
                    setDoctorEmail(staffMember.email);
                  }}
                >
                  Select
                </button>
              </div>
            </div>
          );
        })}
        {showModal && (
          <UploadReports
            closeModal={setShowModal}
            dName={doctorName}
            dEmail={doctorEmail}
          />
        )}
      </div>
      <footer
        className="py-3"
        style={{
          backgroundColor: "#eef4ed",
          borderTop: "1px solid #ccc",
          flexShrink: 0,
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
    </div>
  );
}

export default CheckReports;