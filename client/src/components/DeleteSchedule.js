import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import NavBar from "./NavBar";
import { Navbar } from "react-bootstrap";

export default function DeleteSchedule() {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [schedules, setSchedules] = useState(null);

  const handleDelete = async (event) => {
    event.preventDefault();
    const confirmed = window.confirm(
      "Are you sure you want to delete this schedule?"
    );
    if (confirmed) {
      setLoading(true);
      try {
        await axios.delete(
          `http://localhost:8070/schedule/schedule/delete/${id}`
        );
        setLoading(false);
        window.location = "/admin/schedule";
      } catch (err) {
        setError(err.response.data.error);
      }
    } else {
      window.location = "/admin/schedule";
    }
  };

  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8070/schedule/schedule/${id}`
        );
        setSchedules(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchSchedule();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <><Navbar /><div>
      <h2>Deleting schedule</h2>

      {schedules && (
        <div className="container-app">
          <form
            onSubmit={handleDelete}
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
                value={schedules.docName}
                disabled />
            </div>

            <div className="mb-3">
              <label for="materials" className="form-label">
                Materials URL:
              </label>
              <input
                type="url"
                name="materials"
                className="form-control"
                value={schedules.materials}
                disabled />
            </div>

            <div className="mb-3">
              <label for="phone" className="form-label">
                Videos URL:
              </label>
              <input
                type="url"
                name="url"
                value={schedules.videos}
                disabled
                className="form-control" />
            </div>

            <div className="mb-3">
              <label for="dname" className="form-label">
                Events URL:
              </label>
              <input
                className="form-control"
                type="url"
                name="events"
                value={schedules.events}
                disabled />
            </div>

            <button type="submit" className="btn btn-primary">
              Delete Schedule
            </button>
          </form>
        </div>
      )}
    </div></>
  );
}
