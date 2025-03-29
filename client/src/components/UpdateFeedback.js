import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import NavBar from "./NavBar";


export default function UpdateFeedback(){
  const {id} = useParams();
  
  const [feedback, setFeedback] = useState({
    userID: "",
    scheduleID:"",
    rating: "",
    comment: ""
  });

  useEffect(() => {
    async function fetchFeedback() {
      try {
        const response = await axios.get(`http://localhost:8070/feedback/${id}`);
        setFeedback(response.data);
       
      } catch (err) {
        console.log(err);
      }
    }
    fetchFeedback();  
  }, [id]);

  const handleChange = (e) => {
    setFeedback({ ...feedback, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      await axios.put(`http://localhost:8070/feedback/update/${id}`, feedback);
      alert("Feedback updated successfully!");
      window.location = "/";
    } catch (err) {
      console.log(err);
    }
  };

  if(!feedback){
    return <div>No Feedback found.</div>;
  }

  return (
    <><NavBar /><form onSubmit={handleSubmit}>
      <div><h2>Edit Feedback</h2></div>
      <div style={{ backgroundColor: "#D4F1F4" }}>
        <div>
          <label>
            User ID:
            <input type="text" name="userID" value={feedback.userID} disabled />
          </label>
        </div>
        <div>
          <label>
            scheduleID:
            <input type="text" name="scheduleID" value={feedback.scheduleID} disabled />
          </label>
        </div>
        <div>
          <div>
            <label>Rating:</label>
            <select name="rating" value={feedback.rating} onChange={handleChange}>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </div>
        </div>
        <div>
          <label>
            Comment:
            <input type="text" name="comment" value={feedback.comment} onChange={handleChange} />
          </label>
        </div>
        <div>
          <button type="submit">Update Feedback</button>
        </div>

      </div>
    </form></>
  );
}
