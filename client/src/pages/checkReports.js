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
      // console.log(data);
      setStaffDetails(data);
    }

    fetchSatffData();
  }, []);
  return (
    <div>
      <NavBar />
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
                {"Specialization :" + staffMember.specialization}
              </h5>
              <h5 className="card-title">
                {"Experience :" + staffMember.experience}
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
  );
}

export default CheckReports;
