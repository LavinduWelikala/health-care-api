import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import NavBar from "./NavBar";


export default function FeedbackListByID() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchDone, setSearchDone] = useState(false);
  const [originalFeedbacks, setOriginalFeedbacks] = useState([]);

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const response = await axios.get(`http://localhost:8070/feedback/`);
        setFeedbacks(response.data);
        setOriginalFeedbacks(response.data);
      } catch (err) {
        console.error(err);
        setFeedbacks([]);
        setOriginalFeedbacks([]);
      }
    };

    fetchFeedbacks();
  }, []);

  const handleSearch = () => {
    const filteredFeedbacks = originalFeedbacks.filter((feedback) => feedback.userID.toString() === searchTerm);
    setFeedbacks(filteredFeedbacks);
    setSearchDone(true);
    
  };

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
    setSearchDone(false);
  };

  return (
    <><NavBar /><div className="feedback-sectionC" style={{ backgroundColor: "#E4F4F3" }}>
      <h1 style={{ marginBottom: "20px", marginTop: "10px" }}>Feedback List</h1>
      <div style={{ marginBottom: "20px" }}>
        <input type="text" value={searchTerm} onChange={handleInputChange} placeholder="Enter userID" />
        <button onClick={handleSearch}>Search</button>
      </div>
      {searchDone ? (
        feedbacks && feedbacks.length > 0 ? (
          <table style={{ borderCollapse: "collapse", width: "100%" }}>
            <thead>
              <tr>
                <th style={{ border: "1px solid black", padding: "8px" }}>User ID</th>
                <th style={{ border: "1px solid black", padding: "8px" }}>Schedule ID</th>
                <th style={{ border: "1px solid black", padding: "8px" }}>Comment</th>
                <th style={{ border: "1px solid black", padding: "8px" }}>Rating</th>
              </tr>
            </thead>
            <tbody>
              {feedbacks.map((feedback) => (
                <tr key={feedback._id}>
                  <td style={{ border: "1px solid black", padding: "8px" }}>{feedback.userID}</td>
                  <td style={{ border: "1px solid black", padding: "8px" }}>
                    <Link to={`/schedule/${feedback.scheduleID}`} style={{ textDecoration: "none" }}>
                      {feedback.scheduleID}
                    </Link>
                  </td>
                  <td style={{ border: "1px solid black", padding: "8px" }}>{feedback.comment}</td>
                  <td style={{ border: "1px solid black", padding: "8px" }}>{feedback.rating}</td>
                  <td style={{ border: "1px solid black", padding: "4px" }}><button> <Link to={`/feedback/update/${feedback._id}`} className="update buttonC">
                    Edit Feedback
                  </Link></button></td>
                  <td style={{ border: "1px solid black", padding: "4px" }}><button><Link to={`/feedback/delete/${feedback._id}`} className="delete buttonC">Delete Feedback</Link></button></td>

                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <h4>No feedbacks found.</h4>
        )
      ) : (
        <h4>Enter a userID to search for feedbacks.</h4>
      )}
    </div></>
  );
}
