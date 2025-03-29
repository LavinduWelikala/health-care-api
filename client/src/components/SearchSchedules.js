import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function SearchSchedule() {
  const [id, setId] = useState("");
  const [schedule, setSchedule] = useState(null);
  const navigate = useNavigate();

  async function fetchSchedule() {
    try {
      const response = await axios.get(
        `http://localhost:8070/schedule/schedule/${id}`
      );
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
    <div>
      <h1
        style={{ margin: "0 auto", textAlign: "center", backgroundColor: "" }}
      >
        Search Schedule
      </h1>
      <br />
      <form onSubmit={handleSearch}>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <input
            className="form-control"
            type="text"
            id="id-input"
            value={id}
            onChange={(event) => setId(event.target.value)}
            style={{ width: "50%", textAlign: "center", marginRight: "30px" }}
          />
          <button className="btn btn-success">Search</button>
        </div>
      </form>
      {schedule && (
        <div className="container-app">
          <form
            className="make-appointment-page"
            style={{ marginTop: "-200px" }}
          >
            <div className="mb-3">
              <label for="pname" className="form-label">
                Doctor Name
              </label>
              <input
                type="text"
                name="docName"
                className="form-control"
                value={schedule.docName}
                disabled
              />
            </div>

            <div className="mb-3">
              <label for="materials" className="form-label">
                Materials URL:
              </label>
              <input
                type="url"
                name="materials"
                className="form-control"
                value={schedule.materials}
                disabled
              />
            </div>

            <div className="mb-3">
              <label for="phone" className="form-label">
                Videos URL:
              </label>
              <input
                type="url"
                name="url"
                value={schedule.videos}
                disabled
                className="form-control"
              />
            </div>

            <div className="mb-3">
              <label for="dname" className="form-label">
                Events URL:
              </label>
              <input
                className="form-control"
                type="url"
                name="events"
                value={schedule.events}
                disabled
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary"
              onClick={() => {
                navigate(`/update-schedule/${schedule._id}`);
              }}
              style={{ marginRight: "30px" }}
            >
              Update Schedule
            </button>
            <button
              type="submit"
              className="btn btn-danger"
              onClick={() => {
                navigate(`/delete-schedule/${schedule._id}`);
              }}
            >
              Delete Schedule
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
