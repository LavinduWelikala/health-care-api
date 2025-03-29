import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import NavBar from "./NavBar";

const Update = () => {
  const { id } = useParams();
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:8070/ipayments/get/${id}`)
      .then((response) => setData(response.data))
      .catch((error) => console.log(error));
  }, [id]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .put(`http://localhost:8070/ipayments/update/${id}`, data)
      .then(() => (window.location = "/view-payment"))
      .catch((error) => console.log(error));
  };

  return (
    <div>
      <NavBar />
      <div
        className="container"
        style={{
          width: "40%",
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.6)",
          borderRadius: "20px",
          padding: "30px",
        }}
      >
        <form onSubmit={handleSubmit}>
          <div class="mb-3">
            <center>
              <h2>Edit Card details</h2>
            </center>

            <label for="Cholder" class="form-label">
              Card Holder Name
            </label>
            <input
              type="text"
              required
              class="form-control"
              id="name"
              name="Cholder"
              value={data.Cholder}
              placeholder="Enter Card Holder"
              onChange={handleInputChange}
            />
          </div>

          <div class="mb-3">
            <label for="CardNumber" class="form-label">
              Card Number
            </label>
            <input
              type="text"
              required
              name="Cnumber"
              class="form-control"
              id="name"
              value={data.Cnumber || ""}
              placeholder="Enter Card number"
              onChange={handleInputChange}
            />
          </div>

          <div class="mb-3">
            <label for="cvv Number" class="form-label">
              cvv Number
            </label>
            <input
              type="number"
              required
              name="cvv"
              class="form-control"
              id="name"
              value={data.cvv || ""}
              placeholder="Enter cvv"
              onChange={handleInputChange}
            />
          </div>
          <button type="submit" class="btn btn-danger">
            Edit
          </button>
        </form>
      </div>
      {/* <div>
         <center> <label htmlFor="date">date:</label></center>
         <center> <input type="Date" name="date" value={data.Date || ''} placeholder="Enter Your Expire date"onChange={handleInputChange} /></center>
        </div> */}
    </div>
  );
};

export default Update;
