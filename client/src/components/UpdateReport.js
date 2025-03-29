import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { storage } from "../Firebase/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";

function UpdateReport({ closeModal, details }) {
  const [complete, setCompleted] = useState(false);
  const [imageUpload, setImageUpload] = useState(null);
  const [patientAge, setPatientAge] = useState("");
  const [notes, setNotes] = useState("");
  const [reportURL, setReportURL] = useState("");
  const [validated, setValidated] = useState(false);

  async function uploadImage(event) {
    handleSubmit(event);
    event.preventDefault();

    // Check file type
    const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
    if (!allowedTypes.includes(imageUpload.type)) {
      alert("Please upload a JPEG, JPG or PNG image file");
      return;
    }

    // if (imageUpload == null) return alert("Please upload medical report");

    const imageRef = ref(storage, `reports/${imageUpload.name + v4()}`);
    uploadBytes(imageRef, imageUpload).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setReportURL(url);
      });
    });

    setCompleted(true);
    setValidated(false);
  }

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };

  function uploadReport(event) {
    event.preventDefault();

    async function updateDetails(id) {
      const response = await fetch(
        `http://localhost:8070/report/change/${id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id: details.id,
            reportURL,
            patientAge,
            notes,
          }),
        }
      );

      const data = await response.json();

      if (data.status === "Report updated") {
        alert("Report updated");
        closeModal(true);
        window.location.reload(false);
      }
    }

    updateDetails(details._id);
  }

  return (
    <>
      <Modal show onHide={() => closeModal(false)}>
        <Modal.Header closeButton>
          <h3>Upload Medical Report</h3>
        </Modal.Header>
        <Modal.Body>
          <div>
            {!complete && (
              <Form noValidate validated={validated} onSubmit={uploadImage}>
                <Row className="mb-3">
                  <Form.Group as={Col} md="12" controlId="url">
                    <Form.Label>Upload report</Form.Label>
                    <Form.Control
                      required
                      type="file"
                      onChange={(event) => {
                        setImageUpload(event.target.files[0]);
                      }}
                    />
                    <Form.Control.Feedback
                      type="invalid"
                      isInvalid={imageUpload == null}
                    >
                      {imageUpload == null && "Image is required"}
                    </Form.Control.Feedback>
                    <Form.Control.Feedback></Form.Control.Feedback>
                  </Form.Group>
                </Row>
                <Button type="submit">Upload</Button>
              </Form>
            )}
            {complete && (
              <Form noValidate validated={validated} onSubmit={uploadReport}>
                <Row className="mb-3">
                  <Form.Group as={Col} md="12" controlId="age">
                    <Form.Label>Patient Age</Form.Label>
                    <Form.Control
                      required
                      minLength={1}
                      type="number"
                      placeholder="Patient age"
                      onChange={(event) => {
                        setPatientAge(event.target.value);
                      }}
                    />
                    <Form.Control.Feedback
                      type="invalid"
                      isInvalid={patientAge.length < 1}
                    >
                      {patientAge.length === 0
                        ? "Age is required"
                        : "Age should be a number"}
                    </Form.Control.Feedback>
                    <Form.Control.Feedback
                      isValid={patientAge.length >= 1}
                    ></Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group as={Col} md="12" controlId="notes">
                    <Form.Label>Notes</Form.Label>
                    <textarea
                      className="form-control"
                      id="exampleFormControlTextarea1"
                      rows="3"
                      type="text"
                      placeholder="Any notes..."
                      onChange={(event) => {
                        setNotes(event.target.value);
                      }}
                    ></textarea>
                  </Form.Group>
                </Row>
                <Button type="submit">Update</Button>
              </Form>
            )}
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default UpdateReport;
