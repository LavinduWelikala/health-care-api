import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function DeleteFeedback() {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [feedbacks, setFeedbacks] = useState(null);

  const handleDelete = async () => {
    const confirmed = window.confirm("Are you sure you want to delete your feedback?");
    if (confirmed) {
      console.log("Feedback deleted successfully.");
      setLoading(true);
      try {
        await axios.delete(`http://localhost:8070/feedback/delete/${id}`);
        setLoading(false);
        window.location.href = "/"; // Corrected the line to update window location
      } catch (err) {
        setError(err.response.data.error);
      }
    } else {
      window.location.href = "/"; // Corrected the line to update window location
    }
  };

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const response = await axios.get(`http://localhost:8070/feedback/${id}`);
        setFeedbacks(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchFeedback();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h2 style={{ backgroundColor: "whitesmoke" }}>Deleting Feedback</h2>

      {feedbacks && (
        <div style={{ backgroundColor: "lightblue" }}>
          <div style={{ backgroundColor: "gray" }}>
            <super>UserID:</super>
          </div>
          <div style={{ border: "1px solid black" }}>
            <p>{feedbacks.userID}</p>
          </div>
          <div style={{ backgroundColor: "gray" }}>
            <super>ScheduleID:</super>
          </div>
          <div style={{ border: "1px solid black" }}>
            <p>{feedbacks.scheduleID}</p>
          </div>
          <div style={{ backgroundColor: "gray" }}>
            <super>Comment:</super>
          </div>
          <div style={{ border: "1px solid black" }}>
            <p>{feedbacks.comment}</p>
          </div>
          <div style={{ backgroundColor: "gray" }}>
            <super>Rating:</super>
          </div>
          <div style={{ border: "1px solid black" }}>
            <p>{feedbacks.rating}</p>
          </div>
        </div>
      )}

      <button onClick={handleDelete}>Delete Feedback</button>
    </div>
  );
}
