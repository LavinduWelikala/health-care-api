import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import NavBar from "./NavBar";
export default function Addpayment() {
  const [CardHolderName, setCardHolderName] = useState("");
  const [CardNumber, setCardNumber] = useState("");
  const [ExpireDate, setExpireDate] = useState("");
  const [cvv, setcvvNumber] = useState("");
  const navigate = useNavigate();

  function sendData(e) {
    e.preventDefault();

    //validation
    const nameRegex = /^[a-zA-Z\s]*$/;
    const cardNumberRegex = /^[0-9]{16}$/;
    const cvvRegex = /^[0-9]{3}$/;

if (!CardHolderName.match(nameRegex)) {
    alert("Please enter a valid Card Holder Name");
    return;
}

if (!CardNumber.match(cardNumberRegex)) {
    alert("Please enter a valid Card Number");
    return;
}

if (!cvv.match(cvvRegex)) {
    alert("Please enter a valid cvv");
    return;
}

if (!ExpireDate) {
    alert("Please select a valid Expire Date");
    return;
}


    const newPayment = {
      CardHolderName,
      CardNumber,
      ExpireDate,
      cvv,
    };

    axios
      .post("http://localhost:8070/ipayments/add", newPayment)
      .then(() => {
        alert("payment added");
        navigate("/view-payment");
      })
      .catch((err) => {
        alert(err);
      });
  }

  return (
    <>
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
        <form onSubmit={sendData}>
          <div class="mb-3">
            <h3>Add Payment Details</h3>

            <label for="Cholder" class="form-label">
              Card Holder Name
            </label>
            <input
              type="text"
              required
              class="form-control"
              id="name"
              placeholder="Enter Card Holder"
              onChange={(e) => {
                setCardHolderName(e.target.value);
              }}
            />
          </div>

          <div class="mb-3">
            <label for="CardNumber" class="form-label">
              Card Number
            </label>
            <input
              type="text"
              required
              class="form-control"
              id="name"
              placeholder="Enter Card number"
              onChange={(e) => {
                setCardNumber(e.target.value);
              }}
            />
          </div>

          <div class="mb-3">
            <label for="Expiredate" class="form-label">
              Expire Date
            </label>
            <input
              type="Date"
              required
              class="form-control"
              id="name"
              placeholder="Enter Your Expire date"
              onChange={(e) => {
                setExpireDate(e.target.value);
              }}
            />
          </div>

          <div class="mb-3">
            <label for="cvv Number" class="form-label">
              cvv Number
            </label>
            <input
              type="number"
              required
              class="form-control"
              id="name"
              placeholder="Enter cvv Number"
              onChange={(e) => {
                setcvvNumber(e.target.value);
              }}
            />
          </div>

          <div class="mb-3 form-check">
            <input
              type="checkbox"
              class="form-check-input"
              id="exampleCheck1"
              required
            />
            <label class="form-check-label" for="exampleCheck1">
              agree
            </label>
          </div>
          <button type="submit" class="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </>
  );
}
