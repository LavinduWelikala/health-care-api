import React, { useState } from "react";
import axios from "axios";
import { Link,useParams } from "react-router-dom";
import NavBar from "./NavBar";
import { Navbar } from "react-bootstrap";

export default function ScheduleforFeedback() {
  const [id, setId] = useState("");
  const [schedule, setSchedule] = useState(null);

 

  async function fetchSchedule() {
    try {
      const response = await axios.get(`http://localhost:8070/schedule/schedule/${id}`);
      setSchedule(response.data);
     
    
    } catch (err) {
      console.error(err);
      setSchedule(null);
    }
    
  }

  function handleSearch(event) {
    event.preventDefault();
    if (id) {
      fetchSchedule();
    }
  }

  
  return (
    <><Navbar /><div style={{ backgroundColor: "#E4F4F3", height: "100vh", }}>
      <h1 style={{ margin: '0 auto', textAlign: 'center', backgroundColor: "" }}>Search Schedule</h1>
      <hr />
      <form onSubmit={handleSearch}>
        <div style={{ backgroundColor: "#E4F4F3", fontSize: "30px", margin: "0 370px" }}>
          <label htmlFor="id-input">Enter your Schedule ID:</label>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <input type="text" id="id-input" value={id} onChange={(event) => setId(event.target.value)} style={{ width: '50%', textAlign: 'center' }} />
        </div>
        <div style={{ margin: '0 auto', textAlign: 'center', marginTop: "10px" }}>
          <button type="submit">Search</button>
        </div>
      </form>
      {schedule && (
        <div>
          <h2>Schedule Details:</h2>
          <ul>
            <li>UserID:{schedule.userID}</li>
            <li>Doctor Name: {schedule.docName}</li>
            <li>Materials URL: {schedule.materials}</li>
            <li>Videos URL: {schedule.videos}</li>
            <li>Events URL: {schedule.events}</li>

          </ul>

          <div className="buttonsC">
            <button><Link to={`/feedback/add/${schedule._id}`} className="AddFeedback button">
              Add Feedback</Link></button>

          </div>
        </div>



      )}
    </div></>
  );
}
