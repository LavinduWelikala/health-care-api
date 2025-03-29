import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { storage } from "../Firebase/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";

function UpdatePrescription({ closeModal, details }) {
  const id = details;
  const [reportURL, setReportURL] = useState("");
  const [validated, setValidated] = useState(false);
  const [imageUpload, setImageUpload] = useState(null);
  const [uploaded, setUploaded] = useState(false);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };

  async function uploadImage(event) {
    handleSubmit(event);
    event.preventDefault();

    var allowedExtensions = /(\.pdf)$/i;
    if (!allowedExtensions.exec(imageUpload.name)) {
      alert("Please select a PDF file.");
      return;
    }

    // if (imageUpload == null) return alert("Please upload medical report");

    const imageRef = ref(storage, `prescriptions/${imageUpload.name + v4()}`);
    await uploadBytes(imageRef, imageUpload).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setReportURL(url);
        setUploaded(true);
      });
    });
  }

  async function updateDetails(event) {
    handleSubmit(event);
    event.preventDefault();

    const response = await fetch(
      `http://localhost:8070/report/update/prescription-upload/${id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id,
          reportURL,
        }),
      }
    );

    const data = await response.json();

    if (data.status === "Prescription updated") {
      alert("Prescription updated");
      closeModal(false);
      window.location.reload(false);
    } else {
      alert("Try Again");
    }
    setValidated(false);
  }

  return (
    <>
      <Modal show onHide={() => closeModal(false)}>
        <Modal.Header closeButton>
          <h3>Update Prescription</h3>
        </Modal.Header>
        <Modal.Body>
          <div>
            {uploaded === false && (
              <Form noValidate validated={validated} onSubmit={uploadImage}>
                <Row className="mb-3">
                  <Form.Group as={Col} md="12" controlId="url">
                    <Form.Label>Upload prescription</Form.Label>
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
            {uploaded === true && (
              <Form noValidate validated={validated} onSubmit={updateDetails}>
                <Row className="mb-3">
                  <Form.Group as={Col} md="12" controlId="url">
                    <Form.Label>Upload prescription</Form.Label>
                    <Form.Control
                      disabled
                      required
                      type="text"
                      placeholder={imageUpload.name}
                    />
                  </Form.Group>
                </Row>
                <Button type="submit">Add Prescription</Button>
              </Form>
            )}
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default UpdatePrescription;
