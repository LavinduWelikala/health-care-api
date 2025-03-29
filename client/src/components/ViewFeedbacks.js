import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import NavBar from "./NavBar";
import { Navbar } from "react-bootstrap";


export default function FeedbackList() {
  const [feedbacks, setFeedbacks] = useState(null);

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const response = await axios.get("http://localhost:8070/feedback/");
        setFeedbacks(response.data);
      } catch (err) {
        console.error(err);
        setFeedbacks([]);
      }
    };

    fetchFeedbacks();
  }, []);

  return (
    <><Navbar /><div className="feedback-sectionC" style={{ backgroundColor: "#E4F4F3" }}>
      <h1 style={{ marginBottom: "20px", marginTop: "10px", }}>Feedback List</h1>
      {feedbacks && feedbacks.length > 0 ? (
        <table style={{ borderCollapse: "collapse", width: "100%" }}>
          <thead>
            <tr>
              <th style={{ border: "1px solid black", padding: "8px" }}>User ID</th>
              <th style={{ border: "1px solid black", padding: "8px" }}>Schedule ID</th>
              <th style={{ border: "1px solid black", padding: "8px" }}>Comment</th>
              <th style={{ border: "1px solid black", padding: "8px" }}>Rating</th>
              <th style={{ border: "1px solid black", padding: "8px" }}>Actions</th>

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

                <td style={{ border: "1px solid black", padding: "8px" }}><button><Link to={`/feedback/delete/${feedback._id}`}>Delete Feedback</Link></button></td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <h4>No feedbacks found.</h4>
      )}
    </div></>
  );
}
