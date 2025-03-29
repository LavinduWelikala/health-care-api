import React, { useEffect, useState } from "react";
import UpdateSatff from "./UpdateSpecialist";
import NavBar from "./NavBar";

export default function ViewAppointments() {
  const [showModal, setShowModal] = useState(false);
  const [staffDetails, setStaffDetails] = useState([]);
  const [details, setDetails] = useState({});
  const [docName,setDoctorName]=useState("");

 

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
      setDoctorName(data.name);  
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
    
    <>
    <NavBar />
    <div style={{width:"50%",position:"absolute",left:"1px",height:"100%",top:"75px"}}><img   style={{ width: "100%", height: "100%" }} src={process.env.PUBLIC_URL + "/AppointmentIamges/AppointmentHomeleftside.jpg"} alt="Doctor Image Appointments home page"/> 
        <div style={{position:"absolute", top:"100px",left:"1px"}}><h1>Can't find what you are looking for?</h1><br/>
        <button
              type="button"
              className="btn btn-primary"
              style={{position:"absolute",left:"225px"}}
              onClick={() => {
                 window.location.href = "/user-appointment";

              } }
                                  >
              Custom appointment
                                  </button>
        </div>

    
     </div>
    <div style={{ width: "50%", position: "absolute", right: "1px", top:"75px" }}>
          <table
              className="table table-primary table-striped table-hover"
              style={{ textAlign: "center" }}
          >
              <thead>
                  <tr>
                      <th scope="col">Name</th>

                      <th scope="col">Specialization</th>
                      <th scope="col">Experience</th>
                      <th scope="col">
                          Action
                      </th>
                  </tr>
              </thead>
              <tbody>
                  {staffDetails.map((staffMember, index) => {
                      return (
                          <tr key={index}>
                              <td>{staffMember.name}</td>

                              <td>{staffMember.specialization}</td>
                              <td>{staffMember.experience}</td>

                              <td>
                                  <button
                                      type="button"
                                      className="btn btn-danger"
                                      onClick={() => {
                                        window.location.href = `/user-appointment/`;

                                      } }
                                  >
                                      Channel
                                  </button>
                              </td>
                          </tr>
                      );
                  })}
              </tbody>
          </table>
          {showModal && <UpdateSatff closeModal={setShowModal} details={details} />}
      </div></>
    
  );
}
