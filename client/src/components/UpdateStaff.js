import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";

function UpdateStaff({ closeModal, details }) {
  const [name, setName] = useState(details.name);

  function updateMember(event) {
    event.preventDefault();

    async function updateDetails(id) {
      const response = await fetch(`http://localhost:8070/staff/update/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: details._id,
          name,
        }),
      });

      const data = await response.json();

      if (data.status === "Staff updated") {
        alert("Staff member were updated");
        closeModal(true);
        window.location.reload(false);
      } else if (data.error === "Invalid name") {
        alert("Invalid name");
      }
    }

    updateDetails(details._id);
  }

  return (
    <>
      <Modal show onHide={() => closeModal(false)}>
        <Modal.Header closeButton>
          <h3>Update Member</h3>
        </Modal.Header>
        <Modal.Body>
          <div>
            <Form noValidate onSubmit={updateMember}>
              <Row className="mb-3">
                <Form.Group as={Col} md="12" controlId="name">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    required
                    minLength={3}
                    type="text"
                    placeholder={details.name}
                    onChange={(event) => setName(event.target.value)}
                    onMouseOut={() => {
                      name.length === 0 && setName(details.name);
                    }}
                  />
                  <Form.Control.Feedback
                    type="invalid"
                    isInvalid={name.length < 3}
                  >
                    {name.length === 0
                      ? "Name will not changed"
                      : "Name should be atleast three characters"}
                  </Form.Control.Feedback>
                  <Form.Control.Feedback
                    isValid={name.length >= 3}
                  ></Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="12" controlId="email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    disabled
                    type="text"
                    placeholder={details.email}
                  />
                </Form.Group>
                <Form.Group as={Col} md="12" controlId="nic">
                  <Form.Label>NIC</Form.Label>
                  <Form.Control
                    disabled
                    type="text"
                    placeholder={details.nic}
                  />
                </Form.Group>
                <Form.Group as={Col} md="12" controlId="role">
                  <Form.Label>Role</Form.Label>
                  <Form.Control
                    required
                    disabled
                    type="text"
                    minLength={3}
                    placeholder={details.role}
                    aria-describedby="inputGroupPrepend"
                  />
                </Form.Group>
              </Row>
              <Button type="submit">Update</Button>
            </Form>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default UpdateStaff;
