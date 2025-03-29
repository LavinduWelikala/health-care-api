import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import NavBar from "./NavBar";

export default function UpdateSchedule() {
  const { id } = useParams();
  const [schedule, setSchedule] = useState({
    docName: "",
    materials: "",
    videos: "",
    events: "",
  });

  useEffect(() => {
    async function fetchSchedule() {
      try {
        const response = await axios.get(
          `http://localhost:8070/schedule/schedule/${id}`
        );
        setSchedule(response.data);
      } catch (err) {
        console.log(err);
      }
    }
    fetchSchedule();
  }, [id]);

  const handleChange = (e) => {
    setSchedule({ ...schedule, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(
        `http://localhost:8070/schedule/schedule/update/${id}`,
        schedule
      );
      alert("Schedule updated successfully!");
      window.location = "/admin/schedule";
    } catch (err) {
      console.log(err);
    }
  };

  if (!id) {
    return <div>No schedule found.</div>;
  }

  return (
    <><NavBar/>
      <h2>Update Schedule</h2>
      <div className="container-app">
        <form
          onSubmit={handleSubmit}
          className="make-appointment-page"
          style={{ marginTop: "-90px" }}
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
              onChange={handleChange}
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
              onChange={handleChange}
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
              onChange={handleChange}
              className="form-control"
            />
          </div>

          <div className="mb-3">
            <label for="dname" className="form-label">
              Events URL:
            </label>
            <input
              type="url"
              name="events"
              value={schedule.events}
              onChange={handleChange}
              className="form-control"
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Update Schedule
          </button>
        </form>
      </div>
    </>
  );
}
