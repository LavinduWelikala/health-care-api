import React, { useEffect, useState } from "react";
import UpdateSatff from "./UpdateSpecialist";

export default function ViewSpecialists() {
  const [showModal, setShowModal] = useState(false);
  const [staffDetails, setStaffDetails] = useState([]);
  const [details, setDetails] = useState({});

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

  async function deleteMember(id) {
    const response = await fetch(
      `http://localhost:8070/specialist/delete/${id}`,
      {
        method: "DELETE",
      }
    );

    const data = await response.json();

    if (data.status === "User deleted") {
      alert("User deleted");
      window.location.reload(false);
    }
  }

  return (
    <div className="d-flex flex-column min-vh-100">
      <div className="flex-grow-1">
        <table
          className="table table-primary table-striped table-hover"
          style={{ textAlign: "center" }}
        >
          <thead>
            <tr>
              <th scope="col">NAME</th>
              <th scope="col">EMAIL</th>
              <th scope="col">NIC</th>
              <th scope="col">SPECIALIZATION</th>
              <th scope="col">EXPERIENCE</th>
              <th scope="col" colSpan={2}>
                EDIT
              </th>
            </tr>
          </thead>
          <tbody>
            {staffDetails.map((staffMember, index) => (
              <tr key={index}>
                <td>{staffMember.name}</td>
                <td>{staffMember.email}</td>
                <td>{staffMember.nic}</td>
                <td>{staffMember.specialization}</td>
                <td>{staffMember.experience}</td>
                <td>
                  <button
                    type="button"
                    className="btn btn-danger btn-sm"
                    onClick={() => deleteMember(staffMember._id)}
                  >
                    Delete
                  </button>
                </td>
                <td>
                  <button
                    type="button"
                    className="btn btn-warning btn-sm"
                    onClick={() => {
                      setShowModal(true);
                      setDetails(staffMember);
                    }}
                  >
                    Update
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {showModal && (
          <UpdateSatff closeModal={setShowModal} details={details} />
        )}
      </div>

      {/* Footer */}
      <footer
        className="py-3 mt-auto"
        style={{
          backgroundColor: "#eef4ed",
          borderTop: "1px solid #ccc",
        }}
      >
        <div className="container">
          <div className="row">
            <div className="col-md-6 text-md-start text-center">
              <p className="mb-1 fw-bold">HCMS © {new Date().getFullYear()} All Right Reserved</p>
              <p className="mb-0">Healthcare Management System</p>
            </div>
            <div className="col-md-6 text-md-end text-center">
              <p className="mb-1">📍 123 Main Street, Colombo, Sri Lanka</p>
              <p className="mb-0">
                📞 +94 11 2345678 | ✉️{" "}
                <a href="mailto:info@hcms.lk">info@hcms.lk</a>
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
