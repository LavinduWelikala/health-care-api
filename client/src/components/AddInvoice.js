import React, { useState } from "react";
import axios from "axios";
import "../styles/AddInvoice.css"
import SideNav from "./SideNav.js"



export default function AddInvoice() {
  
  
  const [patientName, setPatientName] = useState("");
  const [address, setAddress] = useState("");
  const [invoiceNumber, setInvoiceNumber] = useState("");
  const [paymentType, setPaymentType] = useState("");
  const [date, setDate] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [medicineName, setMedicineName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [mrp, setMRP] = useState("");
  const [total, setTotal] = useState("");
  const [errors, setErrors] = useState({});

  function validateForm() {
    let errors = {};
    let formIsValid = true;

    if (!patientName) {
      formIsValid = false;
      errors["patientName"] = "Patient name cannot be empty";
    } else if (!/^[a-zA-Z\s]*$/.test(patientName)) {
      formIsValid = false;
      errors["patientName"] = "Patient name should only contain alphabets and spaces";
    }
    
    if (!address) {
      formIsValid = false;
      errors["address"] = "Address cannot be empty";
    }

    if (!invoiceNumber) {
      formIsValid = false;
      errors["invoiceNumber"] = "Invoice number cannot be empty";
    } else if (isNaN(invoiceNumber)) {
      formIsValid = false;
      errors["invoiceNumber"] = "Invoice number  cannot be a number";
    }
    
    if (!paymentType) {
      formIsValid = false;
      errors["paymentType"] = "PaymentType  cannot be empty";
    }
    if (!date) {
      formIsValid = false;
      errors["date"] = "Date  cannot be empty";
    }
    if (!contactNumber) {
      formIsValid = false;
      errors["contactNumber"] = "Contact number cannot be empty";
    } else if (!/^\d{10}$/.test(contactNumber)) {
      formIsValid = false;
      errors["contactNumber"] = "Contact number should be a 10-digit number";
    }
    
    if (!medicineName) {
      formIsValid = false;
      errors["medicineName"] = "Medicine name cannot be empty";
    } else if (!/^[a-zA-Z]+$/.test(medicineName)) {
      formIsValid = false;
      errors["medicineName"] = "Medicine name should only contain letters";
    }
    
    
    if (!quantity) {
      formIsValid = false;
      errors["quantity"] = "Quantity cannot be empty";
    } else if (isNaN(quantity)) {
      formIsValid = false;
      errors["quantity"] = "Quantity should be a number";
    }
    

    if (!mrp) {
      formIsValid = false;
      errors["mrp"] = "MRP cannot be empty";
    } else if (!/^\d+$/.test(mrp)) {
      formIsValid = false;
      errors["mrp"] = "MRP should be a valid integer number";
    }
    
    if (!total) {
      formIsValid = false;
   
      errors["total"] = "Total cannot be empty";
    }
    
  


    setErrors(errors);
    return formIsValid;
  }



  function sendData(event) {
    event.preventDefault();
   
    if (validateForm()) {
    const newInvoice ={

    
      patientName,
      address,
      invoiceNumber,
      paymentType,
      date,
      contactNumber,
      medicineName,
      quantity,
      mrp,
      total
    };
  
    axios.post("http://localhost:8070/invoice/add", newInvoice)
      .then(() => {
        alert("Invoice Added");

        setPatientName("");
        setAddress("");
        setInvoiceNumber("");
        setPaymentType("");
        setDate("");
        setContactNumber("");
        setMedicineName("");
        setQuantity("");
        setMRP("");
        setTotal("");
      })
      .catch((err) => {
        alert(err)
      })
  }
}

  function calculateTotal() {
    const calculatedTotal = quantity * mrp;
    setTotal(calculatedTotal);
  }

  return (
   
<>
<SideNav />
<div className="container-ph1" id="invoice-form">
  <form onSubmit={sendData} style={{ width: "60%" }}>
    <h1 className="ai" id="add-invoice-heading" style={{ textAlign: "center", fontSize: "3rem", fontWeight: "bold", color: "#3f51b5", textShadow: "2px 2px 2px rgba(0, 0, 0, 0.5)", marginLeft: "10%" }}>Add Invoice</h1>
    <br></br>
        <div className="row">
          <div className="col-md-6 form-group">
            <label className="font-weight-bold" htmlFor="patientName">
              Patient Name:
            </label>
            <input
              type="text"
              className={`form-control ${
                errors["patientName"] ? "is-invalid" : ""
              }`}
              id="patientName"
              placeholder="Patient Name"
              value={patientName}
              onChange={(event) => {
                setPatientName(event.target.value);
              }}
              />
              {errors["patientName"] && (
                <div className="invalid-feedback">{errors["patientName"]}</div>
              )}
            
          </div>
          <div className="col-md-6 form-group">
            <label className="font-weight-bold" htmlFor="address">
              Address:
            </label>
            <input
              type="text"
              className={`form-control ${
                errors["address"] ? "is-invalid" : ""
              }`}
              id="address"
              placeholder="Address"
              value={address}
              onChange={(event) => {
                setAddress(event.target.value);
              }}
            />
            {errors["address"] && (
                <div className="invalid-feedback">{errors["address"]}</div>
              )}
            
          </div>
        </div>

        <div className="row">
          <div className="col-md-6 form-group">
            <label className="font-weight-bold" htmlFor="invoiceNumber">
              Invoice Number:
            </label>
            <input
              type="text"
              className={`form-control ${
                errors["invoiceNumber"] ? "is-invalid" : ""
              }`}
              id="invoiceNumber"
              placeholder="Invoice Number"
              value={invoiceNumber}
              onChange={(event) => {
                setInvoiceNumber(event.target.value);
              }}
            />
            {errors["invoiceNumber"] && (
                <div className="invalid-feedback">{errors["invoiceNumber"]}</div>
              )}
            
          </div>
          <div className="col-md-6 form-group">
  <label className="font-weight-bold" htmlFor="paymentType">
    Payment Type:
  </label>
  <select
    className={`form-control ${
      errors["paymentType"] ? "is-invalid" : ""
    }`}
    id="paymentType"
    value={paymentType}
    onChange={(event) => {
      setPaymentType(event.target.value);
    }}
  >
    <option value="">Select Payment Type</option>
    <option value="Cash Payment">Cash Payment</option>
    <option value="Credit Card">Credit Card</option>
    <option value="Debit Card">Debit Card</option>
  </select>
  {errors["paymentType"] && (
    <div className="invalid-feedback">{errors["paymentType"]}</div>
  )}
</div>
</div>
         <div className="row">
      <div className="col-md-6 form-group">
        <label className="font-weight-bold" htmlFor="date">
          Date:
        </label>
        <input
          type="date"
          className={`form-control ${
            errors["date"] ? "is-invalid" : ""
          }`}
          id="date"
          placeholder="Date"
          value={date}
          onChange={(event) => {
            setDate(event.target.value);
          }}
        />
        {errors["date"] && (
                <div className="invalid-feedback">{errors["date"]}</div>
              )}
            
      </div>
      <div className="col-md-6 form-group">
        <label className="font-weight-bold" htmlFor="contactNumber">
          Contact Number:
        </label>
        <input
          type="text"
          className={`form-control ${
            errors["contactNumber"] ? "is-invalid" : ""
          }`}
          id="contactNumber"
          placeholder="Contact Number"
          value={contactNumber}
          onChange={(event) => {
            setContactNumber(event.target.value);
          }}
        />
        {errors["contactNumber"] && (
                <div className="invalid-feedback">{errors["contactNumber"]}</div>
              )}
            
      </div>
    </div>

    <div className="row">
      <div className="col-md-6 form-group">
        <label className="font-weight-bold" htmlFor="medicineName">
          Medicine Name:
        </label>
        <input
          type="text"
          className={`form-control ${
            errors["medicineName"] ? "is-invalid" : ""
          }`}
          id="medicineName"
          placeholder="Medicine Name"
          value={medicineName}
          onChange={(event) => {
            setMedicineName(event.target.value);
          }}
        />
        {errors["medicineName"] && (
                <div className="invalid-feedback">{errors["medicineName"]}</div>
              )}
            
      </div>
      <div className="col-md-6 form-group">
        <label className="font-weight-bold" htmlFor="quantity">
          Quantity:
        </label>
        <input
          type="text"
          className={`form-control ${
            errors["quantity"] ? "is-invalid" : ""
          }`}
          id="quantity"
          placeholder="Quantity"
          value={quantity}
          onChange={(event) => {
            setQuantity(event.target.value);
          }}
        />
        {errors["quantity"] && (
                <div className="invalid-feedback">{errors["quantity"]}</div>
              )}
            
      </div>
    </div>

    <div className="row">
      <div className="col-md-6 form-group">
        <label className="font-weight-bold" htmlFor="mrp">
          MRP:
        </label>
        <input
          type="text"
          className={`form-control ${
            errors["mrp"] ? "is-invalid" : ""
          }`}
          id="mrp"
          placeholder="MRP"
          value={mrp}
          onChange={(event) => {
            setMRP(event.target.value);
          }}
        />
        {errors["mrp"] && (
          <div className="invalid-feedback">{errors["mrp"]}</div>
        )}
      
      </div>
      <div className="col-md-6 form-group">
        <label className="font-weight-bold" htmlFor="total">
          Total:
        </label>
        <input
          type="text"
          className={`form-control ${
            errors["total"] ? "is-invalid" : ""
          }`}
          id="total"
          placeholder="Total"
          value={total}
          onChange={(event) => {
            setTotal(event.target.value);
          }}
        />
        {errors["total"] && (
                <div className="invalid-feedback">{errors["total"]}</div>
              )}
            
      </div>
    </div>

    <div className="row">
      <div className="col-md-6 form-group">
        <button
          type="button"
          className="btn btn-primary"
          onClick={calculateTotal}
        >
          Calculate Total
        </button>
      </div>
      <div className="col-md-6 form-group">
        <button type="submit" className="btn btn-success">
          Add Invoice
        </button>
      </div>
    </div>
  </form>
</div>
</>
);
}
