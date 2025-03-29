import React, { useState } from "react";
import {
  FaBars,
  FaTh,
  FaUserAlt,
  FaSignOutAlt,
  FaFileContract,
  FaChartBar,
  FaCalendarCheck,
  FaClipboardList,
} from "react-icons/fa";
import { NavLink } from "react-router-dom";
import "../styles/adminSideBar.css";

function Sidebar({ children }) {
  const userRole = localStorage.getItem("userRole");
  let menuIem = [];

  function adminLogout() {
    localStorage.removeItem("userRole");
    localStorage.removeItem("token");
    window.location.replace("/");
  }

  const [isOpen, setIsOpen] = useState(true);
  const toggle = () => setIsOpen(!isOpen);

  if (userRole === "admin") {
    menuIem = [
      // { path: "/admin", name: "Dashboard", icon: <FaTh /> },
      { path: "/admin/accounts", name: "Staff Accounts", icon: <FaUserAlt /> },
      { path: "/admin/staff", name: "Portfolios", icon: <FaFileContract /> },
      { path: "/admin/user-stats", name: "User Stats", icon: <FaChartBar /> },
      {
        path: "/admin/appointment",
        name: "Appointments",
        icon: <FaCalendarCheck />,
      },
      { path: "/admin/schedule", name: "Schedules", icon: <FaClipboardList /> },
    ];
  } else if (userRole === "doctor") {
    menuIem = [
      { path: "/quiz", name: "Quiz", icon: <FaUserAlt /> },
      { path: "/schedule", name: "Schedule", icon: <FaUserAlt /> },
      { path: "/report", name: "Report", icon: <FaTh /> },
    ];
  }

  return (
    <div className="container1">
      <div style={{ width: isOpen ? "250px" : "50px" }} className="sidebar">
        <div className="top_section">
          <h1 style={{ display: isOpen ? "block" : "none" }} className="logo">
            Logo
          </h1>
          <div
            style={{ marginLeft: isOpen ? "100px" : "0px" }}
            className="bars"
          >
            <FaBars onClick={toggle} />
          </div>
        </div>
        {menuIem.map((item, index) => (
          <NavLink to={item.path} key={index} className="link">
            <div className="icon">{item.icon}</div>
            <div
              style={{ display: isOpen ? "block" : "none" }}
              className="link_text"
            >
              {item.name}
            </div>
          </NavLink>
        ))}
        <NavLink className="link" onClick={adminLogout}>
          <div className="icon">
            <FaSignOutAlt />
          </div>
          <div
            style={{ display: isOpen ? "block" : "none" }}
            className="link_text"
          >
            Logout
          </div>
        </NavLink>
      </div>
      <main>{children}</main>
    </div>
  );
}

export default Sidebar;
