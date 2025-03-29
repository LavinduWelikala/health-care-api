import React from "react";
import NavBar from "../components/NavBar";
import MedicalProfile from "./medicalProfile";

function userHome() {
  return (
    <>
      <NavBar />
      <h2
        style={{ textAlign: "left", marginLeft: "50px", marginBottom: "50px" }}
      >
        My medical reports
      </h2>
      <MedicalProfile />
    </>
  );
}

export default userHome;
