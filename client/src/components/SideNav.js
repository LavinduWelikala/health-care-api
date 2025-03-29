import React, { useState } from "react";
import "../styles/SideNav.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserAlt,
  faDollarSign,
  faUserPlus,
  faBriefcaseMedical,
  faHome,
  faCaretDown,
  faCaretUp,
} from "@fortawesome/free-solid-svg-icons";

function SideNav() {
  const [showInvoiceDropdown, setShowInvoiceDropdown] = useState(false);
  const [showPatientDropdown, setShowPatientDropdown] = useState(false);
  const [showMedicineDropdown, setShowMedicineDropdown] = useState(false);

  const toggleInvoiceDropdown = () => {
    setShowInvoiceDropdown(!showInvoiceDropdown);
    setShowPatientDropdown(false);
    setShowMedicineDropdown(false);
  };

  const togglePatientDropdown = () => {
    setShowInvoiceDropdown(false);
    setShowPatientDropdown(!showPatientDropdown);
    setShowMedicineDropdown(false);
  };

  const toggleMedicineDropdown = () => {
    setShowInvoiceDropdown(false);
    setShowPatientDropdown(false);
    setShowMedicineDropdown(!showMedicineDropdown);
  };

  function handleLogout() {
    localStorage.removeItem("userRole");
    window.location.replace("/");
  }

  return (
    <div className="sidenav1">
      <div style={{ textAlign: "center" }}>
        <FontAwesomeIcon
          icon={faUserAlt}
          style={{ fontSize: "48px", color: "grey" }}
        />
        <h2 style={{ color: "#d00000" }}>Pharmacist</h2>
      </div>
      <Link to="/Dashboard">
        <FontAwesomeIcon icon={faHome} /> Dashboard
      </Link>
      <button className="dropdown-btn" onClick={toggleInvoiceDropdown}>
        <FontAwesomeIcon icon={faDollarSign} /> Invoice{" "}
        {showInvoiceDropdown ? (
          <FontAwesomeIcon icon={faCaretUp} />
        ) : (
          <FontAwesomeIcon icon={faCaretDown} />
        )}
      </button>
      {showInvoiceDropdown && (
        <div className="dropdown-container">
          <Link to="/add_invoice">Add Invoice</Link>
          <Link to="/manage_invoice">Manage Invoice</Link>
        </div>
      )}
      <button className="dropdown-btn" onClick={togglePatientDropdown}>
        <FontAwesomeIcon icon={faUserPlus} /> Patient{" "}
        {showPatientDropdown ? (
          <FontAwesomeIcon icon={faCaretUp} />
        ) : (
          <FontAwesomeIcon icon={faCaretDown} />
        )}
      </button>
      {showPatientDropdown && (
        <div className="dropdown-container">
          <Link to="/add">Add Patient</Link>
          <Link to="/manage">Manage Patient</Link>
        </div>
      )}
      <button className="dropdown-btn" onClick={toggleMedicineDropdown}>
        <FontAwesomeIcon icon={faBriefcaseMedical} /> Medicine{" "}
        {showMedicineDropdown ? (
          <FontAwesomeIcon icon={faCaretUp} />
        ) : (
          <FontAwesomeIcon icon={faCaretDown} />
        )}
      </button>
      {showMedicineDropdown && (
        <div className="dropdown-container">
          <Link to="/add_medicine">Add Medicine</Link>
          <Link to="/manage_medicine">Manage Medicine</Link>
        </div>
      )}
      <Link onClick={handleLogout}>
        <FontAwesomeIcon icon={faHome} /> Logout
      </Link>
    </div>
  );
}

export default SideNav;
