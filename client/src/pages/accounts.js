import React, { useState } from "react";
import "../styles/staff.css";
import { FaTh, FaPlus, FaSearch } from "react-icons/fa";
import AddStaff from "../components/AddStaff";
import ViewStaff from "../components/ViewStaff";
import UpdateSatff from "../components/UpdateStaff";

function Staff() {
  const [showModal, setShowModal] = useState(false);
  const [selected, setSelected] = useState("view");
  const [show, setShow] = useState(false);
  const [name, setName] = useState("");
  const [details, setDetails] = useState({});

  async function deleteMember(id) {
    const response = await fetch(`http://localhost:8070/staff/delete/${id}`, {
      method: "DELETE",
    });

    const data = await response.json();

    if (data.status === "User deleted") {
      alert("User deleted");
      window.location.reload(false);
    }
  }

  function handleSearch(event) {
    event.preventDefault();

    if (name === "") {
      alert("Required");
    } else {
      async function searchDetails(id) {
        const response = await fetch(`http://localhost:8070/staff/get/${id}`, {
          method: "GET",
        });

        const data = await response.json();

        if (data.status === "Found User") {
          setShow(true);
          setDetails(data);
        } else if (data.status === "NotFound User") {
          alert("User not found");
          setName("");
          window.location.reload(false);
        }
      }

      searchDetails(name);
    }
  }

  return (
    <div>
      <div>
        <div style={{ marginBottom: "50px" }}>
          <h1 style={{ textAlign: "center" }}>Staff Details</h1>
        </div>
        <div style={{ marginBottom: "50px", display: "flex" }}>
          <div>
            <button
              type="button"
              className="btn btn-outline-primary"
              onClick={() => setSelected("view")}
            >
              <FaTh className="icon" />
              <div className="text">View</div>
            </button>
            <button
              type="button"
              className="btn btn-outline-primary"
              onClick={() => setSelected("add")}
            >
              <FaPlus className="icon" />
              <div className="text">Add</div>
            </button>
          </div>
          {selected === "view" && (
            <div style={{ marginLeft: "auto" }}>
              <form noValidate onSubmit={handleSearch}>
                <span
                  style={{
                    float: "right",
                    display: "flex",
                    height: "40px",
                    marginTop: "15px",
                  }}
                >
                  <input
                    className="form-control"
                    onChange={(event) => {
                      setName(event.target.value);
                    }}
                    required
                  />
                  <button className="btn btn-outline-success" type="submit">
                    <FaSearch />
                  </button>
                </span>
              </form>
            </div>
          )}
        </div>
      </div>
      {details !== {} && show === true && (
        <div>
          <table
            className="table table-primary table-striped table-hover"
            style={{ textAlign: "center" }}
          >
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">NIC</th>
                <th scope="col">Occupation</th>
                <th scope="col" colSpan={2}>
                  Edit
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{details.staff.name}</td>
                <td>{details.staff.nic}</td>
                <td>{details.staff.role}</td>
                <td>
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => deleteMember(details.staff._id)}
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
                    }}
                  >
                    Update
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
          <button
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            className="btn btn-danger"
            onClick={() => {
              setName("");
              setShow(false);
              window.location.reload(false);
            }}
          >
            Back
          </button>
        </div>
      )}
      {selected === "view" && show === false && <ViewStaff />}
      {selected === "add" && show === false && <AddStaff />}
      {showModal && (
        <UpdateSatff closeModal={setShowModal} details={details.staff} />
      )}
    </div>
  );
}

export default Staff;
