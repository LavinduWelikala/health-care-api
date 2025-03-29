import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { FaSearch, FaTh } from "react-icons/fa";
import jsPDF from "jspdf";
import { autoTable } from "jspdf-autotable";
import { useNavigate } from "react-router-dom";
import FeedbackList from "./ViewFeedbacks";
import NavBar from "./NavBar";

export default function ScheduleByID() {  
    const {id}= useParams();
  const navigate = useNavigate();
  const [schedules, setSchedules] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchDone, setSearchDone] = useState(false);
  const [originalSchedule, setOriginalSchedule] = useState([]);

  const doc = new jsPDF();
  const [column] = useState([
    "Schedule ID",
    "Events",
    "Materials",
    "Videos",
    "Doctor Name",
    
  ]);

  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        const response = await axios.get("http://localhost:8070/schedule/schedule");
        setSchedules(response.data);
        setOriginalSchedule(response.data);
      } catch (err) {
        console.error(err);
        setSchedules([]);
        setOriginalSchedule([]);
      }
    };

    fetchSchedule();
  }, []);
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
   
  };

  const handleSearch = () => {
    const filteredSchedules = originalSchedule.filter(
      (schedule) => schedule.userID.toString() === searchTerm
    );
    setSchedules(filteredSchedules);
    setSearchDone(true);
  };

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
    setSearchDone(false);
  };

  const handleDownload = () => {
    const element = document.createElement("a");
    const file = new Blob([JSON.stringify(schedules)], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = "schedule.txt";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  }
  const redirectFeedbackAdd = (scheduleID) => {
    copyToClipboard(scheduleID);
    window.location.replace(`/feedback/adding/`);
  };

  return (
    <><NavBar /><div className="feedback-sectionC" style={{ backgroundColor: "#E4F4F3" }}>
      <h1 style={{ marginBottom: "20px", marginTop: "10px" }}>Get your schedule</h1>
      <div style={{ marginBottom: "20px" }}>
        <input type="text" value={searchTerm} onChange={handleInputChange} placeholder="Enter userID" />
        <button onClick={handleSearch}>Search</button>
        <button onClick={generateReport}>Download</button>

      </div>
      {searchDone ? (
        schedules && schedules.length > 0 ? (
          <table style={{ borderCollapse: "collapse", width: "100%" }}>
            <thead>
              <tr>
                <th style={{ border: "1px solid black", padding: "8px" }}>User ID</th>
                <th style={{ border: "1px solid black", padding: "8px" }}>Schedule ID</th>
                <th style={{ border: "1px solid black", padding: "8px" }}>Doctor's Name</th>
                <th style={{ border: "1px solid black", padding: "8px" }}>Materials</th>
                <th style={{ border: "1px solid black", padding: "8px" }}>Videos</th>
                <th style={{ border: "1px solid black", padding: "8px" }}>Events</th>
                <th style={{ border: "1px solid black", padding: "8px" }}>Actions</th>

              </tr>
            </thead>
            <tbody>
              {schedules.map((schedule) => (
                <tr key={schedule._id}>
                  <td style={{ border: "1px solid black", padding: "8px" }}>{schedule.userID}</td>
                  <td style={{ border: "1px solid black", padding: "8px" }}>{schedule._id}</td>
                  <td style={{ border: "1px solid black", padding: "8px" }}>
                    <Link to={`/schedule/${schedule.scheduleID}`} style={{ textDecoration: "none" }}>
                      {schedule.docName}
                    </Link>
                  </td>
                  <td style={{ border: "1px solid black", padding: "8px" }}>{schedule.materials}</td>
                  <td style={{ border: "1px solid black", padding: "8px" }}>{schedule.videos}</td>
                  <td style={{ border: "1px solid black", padding: "8px" }}>{schedule.events}</td>
                  <td style={{ border: "1px solid black", padding: "8px" }}><button onClick={() => redirectFeedbackAdd(schedule._id)}>Add Feedback</button></td>


                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <h4>No schedules found.</h4>
        )
      ) : (
        <h4>Enter a userID to search for schedules.</h4>
      )}
    </div></>
  );
}
