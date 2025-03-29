import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import NavBar from "./NavBar";

export default function Updategoal() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [daysPerWeek, setDaysPerWeek] = useState("");
  const [notes, setNotes] = useState("");

  useEffect(() => {
    async function fetchSchedule() {
      try {
        const response = await axios.get(
          `http://localhost:8070/goals/get/${id}`
        );
        setDaysPerWeek(response.data.display.daysPerWeek);
        setNotes(response.data.display.notes);
      } catch (err) {
        console.log(err);
      }
    }
    fetchSchedule();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedGoal = {
      daysPerWeek,
      notes,
    };

    try {
      const response = await axios.put(
        `http://localhost:8070/goals/update/${id}`,
        updatedGoal
      );
      if (response.status === 200) {
        alert("Goal updated successfully!");
      } else {
        alert("Error updating goal.");
      }
    } catch (err) {
      alert("Error updating goal.");
    }
  };

  return (
    <>
      <NavBar />
      <div className="bigcontainer">
        <h1>Update Your Schedule</h1>
        <form onSubmit={handleSubmit}>
          <label>
            Days per week:
            <input
              type="number"
              required
              value={daysPerWeek}
              onChange={(e) => {
                const value = parseInt(e.target.value);
                if (value >= 0 && value <= 7) {
                  setDaysPerWeek(value);
                }
              }}
              min="0"
              max="7"
            />
          </label>
          <label>
            Notes
            <br />
            <textarea
              type="text"
              placeholder={notes}
              onChange={(e) => {
                setNotes(e.target.value);
              }}
            />
          </label>
          <button type="submit" className="btn btn-primary">
            Update Goal
          </button>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => navigate(`/getgoal/${id}`)}
            style={{ marginTop: "20px" }}
          >
            View Goal
          </button>
        </form>
      </div>
    </>
  );
}
