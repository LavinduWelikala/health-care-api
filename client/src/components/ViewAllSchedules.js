import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { FaSearch, FaTh } from "react-icons/fa";
import jsPDF from "jspdf";
import { autoTable } from "jspdf-autotable";
import NavBar from "./NavBar";

const GetSchedules = () => {
  const [schedules, setSchedules] = useState(null);
  const navigate = useNavigate();
  const [columns] = useState([]);
  const doc = new jsPDF();
  const [column] = useState([
    "Schedule ID",
    "Doctor Name",
    "Materials",
    "Videos",
    "Events",
  ]);

  useEffect(() => {
    const fetchSchedules = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8070/schedule/schedule`
        );
        console.log(response);
        if (response.status === 200) {
          setSchedules(response.data);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchSchedules();
  }, []);

  const redirectFeedback = () => {
    
    window.location.replace(`/feedback/`);
  };


  const copyToClipboard = (text) => {
    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.setAttribute("readonly", "");
    textarea.style.position = "absolute";
    textarea.style.left = "-9999px";
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    document.body.removeChild(textarea);
    alert("Copied to clipboard");
  };
  function generateReport() {
    const columnStyles = {
      0: { columnWidth: 20 },
      1: { columnWidth: 20 },
      2: { columnWidth: 20 },
      3: { columnWidth: 21 },
      4: { columnWidth: 20 },
      5: { columnWidth: 20 },
      6: { columnWidth: 20 },
      7: { columnWidth: 20 },
      8: { columnWidth: 15 },
      9: { columnWidth: 10 },
    };
  
    if (schedules) {
      doc.autoTable({
        head: [column],
        body: schedules.map((schedule) => Object.values(schedule)),
        columnStyles: columnStyles,
      });
      doc.save("schedules_report.pdf");
    }
   
    
  }

  const handleDownload = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8070/schedule/schedule/`,
        { responseType: "blob" }
      );
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "Schedule Details.csv");
      document.body.appendChild(link);
      link.click();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <><NavBar /><div className="container">
      <h1 style={{ margin: "0 auto", textAlign: "center" }}>All schedules</h1>
      <div style={{ marginTop: "50px", marginBottom: "30px" }}>
        <button
          type="button"
          className="btn btn-outline-primary"
          onClick={() => {
            window.location.replace("/admin/schedule");
          } }
        >
          <FaTh className="icon" />
          <div className="text">View</div>
        </button>
        <button
          type="button"
          className="btn btn-outline-primary"
          onClick={() => {
            window.location.replace("/admin/search-schedule");
          } }
        >
          <FaSearch className="icon" />
          <div className="text">Search</div>
        </button>
      </div>

      <table
        className="table table-primary table-striped table-hover"
        style={{ textAlign: "center" }}
      >
        <thead>
          <tr>
            <th scope="col">Schedule ID</th>
            <th scope="col">Doctor Name</th>
            <th scope="col">Materials</th>
            <th scope="col">Videos</th>
            <th scope="col">Events</th>
            <th scope="col" colSpan={3}>
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {schedules &&
            schedules.map((schedule, index) => {
              return (
                <tr key={index}>
                  <td>{schedule.userID}</td>
                  <td>{schedule.docName}</td>
                  <td>{schedule.materials}</td>
                  <td>{schedule.videos}</td>
                  <td>{schedule.events}</td>
                  <td>
                    <button
                      type="button"
                      className="btn btn-success"
                      onClick={() => copyToClipboard(schedule._id)}
                    >
                      Copy
                    </button>
                  </td>
                  <td>
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={() => {
                        navigate(`/update-schedule/${schedule._id}`);
                      } }
                    >
                      Update
                    </button>
                  </td>
                  <td>
                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={() => {
                        navigate(`/delete-schedule/${schedule._id}`);
                      } }
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
      <button className="btn btn-success" onClick={generateReport}>
        Download
      </button>
      <button style={{ left: "150px", top: "675px", position: "sticky" }} className="btn btn-success" onClick={redirectFeedback}>
        View Feedbacks
      </button>
    </div></>
  );
};

export default GetSchedules;
