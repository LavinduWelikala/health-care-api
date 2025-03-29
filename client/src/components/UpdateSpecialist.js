import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";

function UpdateStaff({ closeModal, details }) {
  const [name, setName] = useState(details.name);
  const [specialization, setSpecialization] = useState(details.specialization);
  const [experience, setExperience] = useState(details.experience);

  function updateMember(event) {
    event.preventDefault();

    async function updateDetails(id) {
      const response = await fetch(
        `http://localhost:8070/specialist/update/${id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id: details._id,
            name,
            specialization,
            experience,
          }),
        }
      );

      const data = await response.json();

      if (data.status === "Specialist updated") {
        alert("Specialist updated");
        closeModal(true);
        window.location.reload(false);
      } else if (data.error === "Invalid name") {
        alert("Invalid name");
      } else if (data.error === "Invalid specialization") {
        alert("Invalid specialization");
      } else if (data.error === "Invalid experience") {
        alert("Invalid experience");
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
                <Form.Group as={Col} md="12" controlId="specialization">
                  <Form.Label>Specialization</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    minLength={3}
                    placeholder={details.specialization}
                    aria-describedby="inputGroupPrepend"
                    onChange={(event) => setSpecialization(event.target.value)}
                    onMouseOut={() => {
                      specialization.length === 0 &&
                        setSpecialization(details.specialization);
                    }}
                  />
                  <Form.Control.Feedback
                    type="invalid"
                    isInvalid={specialization.length < 3}
                  >
                    {specialization.length === 0
                      ? "Specialization is required"
                      : "Specialization should be atleast three characters"}
                  </Form.Control.Feedback>
                  <Form.Control.Feedback
                    isValid={specialization.length >= 3}
                  ></Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="12" controlId="experience">
                  <Form.Label>Experience</Form.Label>
                  <Form.Control
                    required
                    type="number"
                    placeholder={details.experience}
                    onChange={(event) => setExperience(event.target.value)}
                    onMouseOut={() => {
                      experience.length === 0 &&
                        setExperience(details.experience);
                    }}
                  />
                  <Form.Control.Feedback
                    type="invalid"
                    isInvalid={experience.length < 1}
                  >
                    {experience.length === 0
                      ? "Experience is required"
                      : "Experience should be atleast five characters"}
                  </Form.Control.Feedback>
                  <Form.Control.Feedback
                    isValid={experience.length >= 1}
                  ></Form.Control.Feedback>
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
