import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import NavBar from "./NavBar";

export default function AddFeedback() {
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState("");
  const [userID, setUserID] = useState("");
  const [scheduleID, setScheduleID] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchSchedule() {
      try {
        const response = await axios.get(`http://localhost:8070/schedule/schedule/${scheduleID}`);
        setUserID(response.data.userID);
      } catch (err) {
        console.error(err);
        setUserID(null);
      }
    }
    if (scheduleID) {
      fetchSchedule();
    }
  }, [scheduleID]);

  function SendData(e) {
    e.preventDefault();

    const newFeedback = {
      scheduleID,
      comment,
      rating,
      userID,
    };

    axios
      .post(`http://localhost:8070/feedback/add/`, newFeedback)
      .then(() => {
        alert("Feedback added.");
        navigate("/");
      })
      .catch((err) => {
        alert(err);
      });
  }

  const handleRatingClick = (value) => {
    setRating(value);
  };

  return (
    <>
      <NavBar />
      <div
        className="feedback-sectionC"
        style={{
          backgroundColor: "#6DA5C0",
          position: "absolute",
          width: "50%",
          float: "left",
          padding: "20px",
          left: "370px",
        }}
      >
        <form onSubmit={SendData}>
          <h1 style={{ marginBottom: "20px", marginTop: "10px" }}>Give us Your Feedback</h1>
          <input
            id="scheduleID"
            placeholder="Add your scheduleID"
            onChange={(e) => {
              setScheduleID(e.target.value);
            }}
          ></input>
          <h5>UserID: {userID}</h5>
          <p style={{ fontSize: "14px", marginBottom: "10px" }}>What do you think about our service?</p>

          <textarea
            id="comment"
            placeholder="Your Comment"
            onChange={(e) => {
              setComment(e.target.value);
            }}
            style={{ width: "100%", padding: "10px", minHeight: "100px" }}
          />

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginTop: "20px",
            }}
          >
            {[...Array(5)].map((star, i) => {
              const ratingValue = i + 1;
              return (
                <button
                  key={i}
                  onClick={() => handleRatingClick(ratingValue)}
                  style={{
                    backgroundColor: ratingValue <= rating ? "gold" : "lightgray",
                    border: "1px solid gray",
                    padding: "10px",
                    borderRadius: "50%",
                    fontSize: "20px",
                    cursor: "pointer",
                  }}
                >
                  {ratingValue}
                </button>
              );
            })}
          </div>

          <button
            type="submit"
            style={{
              marginTop: "20px",
              backgroundColor: "#18A558",
              color: "white",
              padding: "10px",
              border: "none",
              borderRadius:"4px" }}
          >
            Submit Feedback
          </button>
        </form>
      </div>
    </>
  );
}
