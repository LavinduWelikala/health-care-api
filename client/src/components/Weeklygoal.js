import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import NavBar from "./NavBar";

export default function Weeklygoal() {
  const { id } = useParams();
  const [daysPerWeek, setDaysPerWeek] = useState(0);

  const [note1, setNote1] = useState("");
  const [note2, setNote2] = useState("");
  const [note3, setNote3] = useState("");
  const [note4, setNote4] = useState("");
  const [status1, setStatus1] = useState("");
  const [status2, setStatus2] = useState("");
  const [status3, setStatus3] = useState("");
  const [status4, setStatus4] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    function getGoal() {
      axios
        .get(`http://localhost:8070/goals/get/${id}`)
        .then((res) => {
          setDaysPerWeek(res.data.display.daysPerWeek);
          setNote1(res.data.display.note1);
          setNote2(res.data.display.note2);
          setNote3(res.data.display.note3);
          setNote4(res.data.display.note4);
          setStatus1(res.data.display.status1);
          setStatus2(res.data.display.status2);
          setStatus3(res.data.display.status3);
          setStatus4(res.data.display.status4);
        })
        .catch((err) => {
          alert(err.message);
        });
    }
    getGoal();
  }, [id]);

  const handleCompleteButtonClick = (event, noteNumber) => {
    event.preventDefault();
  
    const updatedStatus = status => (status === "Incomplete" ? "Complete" : "Incomplete");
    alert(noteNumber);
  
    let newStatus = "";
    switch (noteNumber) {
      case 1:
        setStatus1("Completed");
        newStatus = updatedStatus(status1);
        break;
      case 2:
        setStatus2("Completed");
        newStatus = updatedStatus(status2);
        break;
      case 3:
        setStatus3("Completed");
        newStatus = updatedStatus(status3);
        break;
      case 4:
        setStatus4("Completed");
        newStatus = updatedStatus(status4);
        break;
      default:
        break;
    }
  
    const newGoal = {
      daysPerWeek,
      note1,
      note2,
      note3,
      note4,
      status1: noteNumber === 1 ? newStatus : status1,
      status2: noteNumber === 2 ? newStatus : status2,
      status3: noteNumber === 3 ? newStatus : status3,
      status4: noteNumber === 4 ? newStatus : status4,
    };
  
    alert(newStatus);
  
    // Update the status in the database
    axios
      .put(`http://localhost:8070/goals/update/${id}`, newGoal)
      .then(() => {
        eval(`setStatus${noteNumber}`)(newStatus);
        alert(`Note ${noteNumber} marked as ${newStatus}.`);
      })
      .catch((err) => {
        alert(err.message);
      });
  };
  const handleRemoveButtonClick = (event) => {
    event.preventDefault();
    const confirmation = window.confirm("Are you sure you want to remove this goal?");
    if (confirmation) {
      axios
        .delete(`http://localhost:8070/goals/delete/${id}`)
        .then(() => {
          alert("Goal removed successfully");
          navigate("/"); // Redirect to another page after removing the goal
        })
        .catch((err) => {
          alert(err.message);
        });
    }
  };
  
  
  return (
    <>
      <NavBar />
      <div className="bigcontainer">
        <h1>Set Your Schedule</h1>
        <div className="description-container">
          <p>
            You're more likely to reach your goal if you dedicate some days for completing your schedule. Select the number of days and choose the days that work for you.
          </p>
        </div>
        <form>
          <label>
            Days per week:
            <input type="text" style={{ width: "50px" }} value={daysPerWeek} disabled />
          </label>
  
          <div className="row">
            <div className="col-8">
              <label>
                Notes:
                <br />
                <input type="text" value={note1} disabled />
              </label>
            </div>
            
            <div className="col-2">
              <br />
              <button
                className={`btn btn-primary mx-2 mt-3 ${status1 === "Complete" ? "btn-success" : ""}`}
                onClick={(event) => handleCompleteButtonClick(event, 1)}
              >
                {status1 === "Complete" ? "Complete" : "Incomplete"}
              </button>
            </div>
          </div>
  
          <div className="row">
            <div className="col-8">
              <label>
                Notes:
                <br />
                <input type="text" value={note2} disabled />
              </label>
            </div>
            <div className="col-2">
              <br />
              <button
                className={`btn btn-primary mx-2 mt-3 ${status2 === "Complete" ? "btn-success" : ""}`}
                onClick={(event) => handleCompleteButtonClick(event, 2)}
              >
                {status2 === "Complete" ? "Complete" : "Incomplete"}
              </button>
            </div>
          </div>
  
          <div className="row">
            <div className="col-8">
              <label>
                Notes:
                <br />
                <input type="text" value={note3} disabled />
              </label>
            </div>
            <div className="col-2">
              <br />
              <button
                className={`btn btn-primary mx-2 mt-3 ${status3 === "Complete" ? "btn-success" : ""}`}
                onClick={(event) => handleCompleteButtonClick(event, 3)}
              >
                {status3 === "Complete" ? "Complete" : "Incomplete"}
              </button>
            </div>
          </div>
          <div className="row">
            <div className="col-8">
              <label>
                Notes:
                <br />
                <input type="text" value={note4} disabled />
              </label>
            </div>
            <div className="col-2">
              <br />
              <button
                className={`btn btn-primary mx-2 mt-3 ${status4 === "Complete" ? "btn-success" : ""}`}
                onClick={(event) => handleCompleteButtonClick(event, 3)}
              >
                {status3 === "Complete" ? "Complete" : "Incomplete"}
              </button>
            </div>
          </div>

        <button  className="btn btn-danger" onClick={handleRemoveButtonClick}>
          Remove
        </button>
      
      </form>
    </div>
    </>
    )
}




