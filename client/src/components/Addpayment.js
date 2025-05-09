import React, { useState, useRef } from "react";
import axios from "axios";
import NavBar from "./NavBar";

export default function CardInputForm() {
  const [cardHolderName, setCardHolderName] = useState("");
  const [cardSection1, setCardSection1] = useState("");
  const [cardSection2, setCardSection2] = useState("");
  const [cardSection3, setCardSection3] = useState("");
  const [cardSection4, setCardSection4] = useState("");
  const [expireDate, setExpireDate] = useState("");
  const [cvv, setCvv] = useState("");

  const section1Ref = useRef(null);
  const section2Ref = useRef(null);
  const section3Ref = useRef(null);
  const section4Ref = useRef(null);
  const expireDateRef = useRef(null);
  const cvvRef = useRef(null);

  const handleCardSectionChange = (e, section, nextRef) => {
    const value = e.target.value;
    if (value === "" || /^[0-9]+$/.test(value)) {
      switch (section) {
        case 1: setCardSection1(value); break;
        case 2: setCardSection2(value); break;
        case 3: setCardSection3(value); break;
        case 4: setCardSection4(value); break;
        default: break;
      }
      if (value.length === 4 && nextRef) {
        nextRef.current.focus();
      }
    }
  };

  const handleKeyDown = (e, section, prevRef) => {
    if (e.key === "Backspace" && e.target.value === "" && prevRef) {
      prevRef.current.focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!cardHolderName || !cardSection1 || !cardSection2 || !cardSection3 || !cardSection4 || !expireDate || !cvv) {
      alert("Please fill out all fields");
      return;
    }

    if (
      cardSection1.length !== 4 || cardSection2.length !== 4 ||
      cardSection3.length !== 4 || cardSection4.length !== 4
    ) {
      alert("Please enter a valid card number");
      return;
    }

    try {
      const response = await axios.post("http://localhost:8070/ipayments/add", {
        CardHolderName: cardHolderName,
        cardSection1, cardSection2, cardSection3, cardSection4,
        ExpireDate: expireDate,
        cvv
      });
      alert("Payment information saved successfully!");
      setCardHolderName(""); setCardSection1(""); setCardSection2(""); setCardSection3(""); setCardSection4("");
      setExpireDate(""); setCvv("");
      setTimeout(() => {
        window.location = "/view-payment";
      }, 1500);
    } catch (error) {
      console.error("Error submitting payment:", error);
      alert("Failed to save payment information");
    }
  };

  return (
    <>
      <NavBar />
      <div className="container mt-5" style={{
        width: "40%",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.6)",
        borderRadius: "20px",
        padding: "30px"
      }}>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <h3>Add Payment Details</h3>

            <label htmlFor="cardHolder" className="form-label">Card Holder Name</label>
            <input
              type="text"
              className="form-control"
              id="cardHolder"
              placeholder="Enter Card Holder"
              value={cardHolderName}
              onChange={(e) => setCardHolderName(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Card Number</label>
            <div className="d-flex justify-content-between">
              {[cardSection1, cardSection2, cardSection3, cardSection4].map((val, i) => (
                <input
                  key={i}
                  type="text"
                  maxLength="4"
                  className="form-control text-center mx-1"
                  style={{ width: "22%" }}
                  value={val}
                  onChange={(e) =>
                    handleCardSectionChange(e, i + 1,
                      [section2Ref, section3Ref, section4Ref, expireDateRef][i])
                  }
                  onKeyDown={(e) =>
                    handleKeyDown(e, i + 1,
                      [null, section1Ref, section2Ref, section3Ref][i])
                  }
                  ref={[section1Ref, section2Ref, section3Ref, section4Ref][i]}
                  required
                />
              ))}
            </div>
          </div>

          <div className="mb-3">
            <label htmlFor="expireDate" className="form-label">Expiration Date</label>
            <input
              type="date"
              className="form-control"
              id="expireDate"
              value={expireDate}
              onChange={(e) => setExpireDate(e.target.value)}
              ref={expireDateRef}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="cvv" className="form-label">CVV</label>
            <input
              type="text"
              maxLength="3"
              className="form-control"
              id="cvv"
              value={cvv}
              onChange={(e) => {
                if (e.target.value === "" || /^[0-9]+$/.test(e.target.value)) {
                  setCvv(e.target.value);
                }
              }}
              ref={cvvRef}
              required
            />
          </div>

          <div className="mb-3 form-check">
            <input type="checkbox" className="form-check-input" id="agreementCheck" required />
            <label className="form-check-label" htmlFor="agreementCheck">Agree</label>
          </div>

          <button type="submit" className="btn btn-primary w-100">Submit Payment</button>
        </form>
      </div>
    </>
  );
}
