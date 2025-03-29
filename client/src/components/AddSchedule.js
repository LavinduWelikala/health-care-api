import React, { useState,useEffect } from "react";
import axios, { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import NavBar from "./NavBar";

export default function AddSchedule(){
   
    const [materials,setMaterials] = useState("");
    const [videos,setVideos] = useState("");
    const [events,setEvents] = useState("");
    const [docName,setDoctorName]=useState("");

    const navigate = useNavigate();

  function sendData(e) {
    e.preventDefault();

    const newSchedule = {
      materials,
      videos,
      events,
      docName
    };

    axios
      .post("http://localhost:8070/schedule/schedule/add", newSchedule)
      .then((response) => {
        alert("Schedule Created.");
        navigate("/quiz");
      })
      .catch((err) => {
        alert(err);
      });
  }

    return(
        <><NavBar /><div style={{ backgroundColor: "#D4F1F4", minHeight: "100vh" }}>
            <div className="containerC" style={{ maxWidth: "800px", margin: "0 auto", padding: "20px", backgroundColor: "#B1D4E0" }}>
                <form onSubmit={sendData}>
                    <legend style={{ fontFamily: "sans-serif", textAlign: "center" }}>Schedule</legend>
                    <div className="ReadingMaterialsC" style={{ backgroundColor: "whitesmoke", borderRadius: "1%", marginBottom: "10px" }}>Reading Materials</div>
                    <div className="AddActivitiesC" style={{ backgroundColor: "whitesmoke", marginBottom: "10px" }}>
                        <input type="url" id="materialsC" placeholder="Insert url" onChange={(e) => setMaterials(e.target.value)} style={{ width: "100%", padding: "20px" }} />
                    </div>

                    <div className="VideosC" style={{ backgroundColor: "whitesmoke", borderRadius: "1%", marginBottom: "10px" }}>Videos</div>
                    <div className="AddActivitiesC" style={{ backgroundColor: "whitesmoke", marginBottom: "10px" }}>
                        <input type="url" id="videosC" placeholder="Insert url" onChange={(e) => setVideos(e.target.value)} style={{ width: "100%", padding: "20px" }} />
                    </div>

                    <div className="EventsC" style={{ backgroundColor: "whitesmoke", borderRadius: "1%", marginBottom: "10px" }}>Events</div>
                    <div className="AddActivitiesC" style={{ backgroundColor: "whitesmoke", marginBottom: "10px" }}>
                        <input type="url" id="events" placeholder="Insert url" onChange={(e) => setEvents(e.target.value)} style={{ width: "100%", padding: "20px" }} />
                    </div>

                    <div style={{ width: "100%" }}>
                        <div className="doctorNameC" style={{ backgroundColor: "whitesmoke", float: "right" }}>
                            <input type="text" id="docName" placeholder="Doctor's name" onChange={(e) => setDoctorName(e.target.value)} style={{ width: "100%" }} />
                        </div>
                    </div>

                    <div className="submitC" style={{ textAlign: "center", marginTop: "10px" }}>
                        <button type="submit" className="uploadbuttonC" style={{ borderRadius: "10%" }}>Upload</button>
                    </div>
                </form>
            </div>
        </div></>
    )
}
