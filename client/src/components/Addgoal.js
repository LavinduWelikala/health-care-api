import React, { useState } from "react";
import axios from "axios";
import "../styles/Addgoal.css";
import { useNavigate } from "react-router-dom";
import NavBar from "./NavBar";

function Addgoal() {
  const navigate = useNavigate();
  const [daysPerWeek, setDaysPerWeek] = useState("");
  
  const [note1, setNote1] = useState("");
  const [note2, setNote2] = useState("");
  const [note3, setNote3] = useState("");
  const [note4, setNote4] = useState("");
  let id = 0;

  const handleSubmit = async (event) => {
    event.preventDefault();

    const newGoal = {
      daysPerWeek,
      note1,
      note2,
      note3,
      note4
    };
    try {
      const response = await axios.post(
        "http://localhost:8070/goals/add",
        newGoal
      );
      
      if (response.status === 200 || response.data.status === "Goals fetched") {
        
        try {
          const response = await axios.get("http://localhost:8070/goals/getlast");
          const lastData = response.data.lastData;
        
          console.log(response.data); // Check the structure and contents of response.data
        
          if (lastData) {
            alert("Goal added successfully");
            console.log(lastData._id);
            navigate(`/getgoal/${lastData._id}`);
          } else {
            alert("Unable to retrieve last data");
          }
        } catch (err) {
          alert(err.message);
        }
                
      } else {
        alert("Error adding goal");
      }
    } catch (error) {
      alert("Error adding goal.POST request failed.");
    }
  };
  

  return (
    <>
      <NavBar />
      <div className="bigcontainer">
        <h1>Set Your Schedule</h1>
        <div className="description-container">
          <p>
            You're more likely to reach your goal if you dedicate some days for
            complete your schedule. Select the number of days and choose the
            days that work for you.
          </p>
        </div>
        <div style={{ marginTop: "15px" }}>
          <form onSubmit={handleSubmit}>
            <label>
              Days per week:
              <input
                required
                type="number"
                value={daysPerWeek}
                onChange={(event) => {
                  const value = parseInt(event.target.value);
                  if (value >= 0 && value <= 7) {
                    setDaysPerWeek(value);
                  }
                }}
                min="0"
                max="7"
              />
            </label>
            <label>
              Goal 1:
              <br />
              <input
                type="text"
                
                placeholder="Any notes.."
                onChange={(event) => {
                  setNote1(event.target.value);
                }}
              />
            </label>

            <label>
              Goal 2:
              <br />
              <input
                type="text"
                placeholder="Any notes.."
                onChange={(event) => {
                  setNote2(event.target.value);
                }}
              />
            </label>

            <label>
              Goal 3:
              <br />
              <input
                type="text"
                placeholder="Any notes.."
                onChange={(event) => {
                  setNote3(event.target.value);
                }}
              />
            </label>

            <label>
              Goal 4:
              <br />
              <input
                type="text"
                placeholder="Any notes.."
                onChange={(event) => {
                  setNote4(event.target.value);
                }}
              />
            </label>

            <button type="submit" className="btn btn-primary">
              Add Goal
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Addgoal;


