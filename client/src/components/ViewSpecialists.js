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
      // console.log(data);
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
    <div>
      <table
        className="table table-primary table-striped table-hover"
        style={{ textAlign: "center" }}
      >
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">NIC</th>
            <th scope="col">Specialization</th>
            <th scope="col">Experience</th>
            <th scope="col" colSpan={2}>
              Edit
            </th>
          </tr>
        </thead>
        <tbody>
          {staffDetails.map((staffMember, index) => {
            return (
              <tr key={index}>
                <td>{staffMember.name}</td>
                <td>{staffMember.email}</td>
                <td>{staffMember.nic}</td>
                <td>{staffMember.specialization}</td>
                <td>{staffMember.experience}</td>
                <td>
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => deleteMember(staffMember._id)}
                  >
                    Delete
                  </button>
                </td>
                <td>
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => {
                      setShowModal(true);
                      setDetails(staffMember);
                    }}
                  >
                    Update
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {showModal && <UpdateSatff closeModal={setShowModal} details={details} />}
    </div>
  );
}
