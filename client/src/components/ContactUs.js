import React from "react";
import NavBar from "./NavBar";

function ContactUs() {
  return (
    <>
      <NavBar />
      <div className="container">
        <div className="row">
          <img
            src="https://img.freepik.com/free-photo/contact-us-communication-support-service-assistance-concept_53876-128103.jpg?size=626&ext=jpg&ga=GA1.1.280052515.1678786237&semt=ais"
            alt="Contact Us"
            className="img-fluid mb-3"
            style={{ height: "500px" }}
          />
        </div>
        <div className="row">
          <div className="col-md-4">
            <h2>HCMS</h2>
            <p>123 Main Street</p>
            <p>Anytown USA</p>
            <p>Phone: (123) 456-7890</p>
            <p>Email: info@hcms.com</p>
          </div>
          <div className="col-md-4">
            <h2>Hours of Operation</h2>
            <p>Monday - Friday: 8am - 5pm</p>
            <p>Saturday: 8am - 12pm</p>
            <p>Sunday: Closed</p>
          </div>
          <div className="col-md-4">
            <h2>Send Us a Message</h2>
            <p>
              We welcome your questions, comments, and feedback. Please feel
              free to reach out to us using the contact information above.
            </p>
          </div>
        </div>
      </div>
      <div>
        <footer
          className="py-3"
          style={{ backgroundColor: "#eef4ed", marginTop: "30px" }}
        >
          <div className="container">
            <div className="row">
              <div className="col-md-6">
                <p>HCMS &copy; {new Date().getFullYear()}</p>
              </div>
              <div className="col-md-6 text-md-end">
                <p>123 Main Street, Sri Lanka</p>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}

export default ContactUs;
