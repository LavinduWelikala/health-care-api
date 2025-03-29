import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";

export default function AddSpecialist() {
  const [validated, setValidated] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [nic, setNIC] = useState("");
  // const [photoURL, setPhotoURL] = useState("");
  const [role, setRole] = useState("");

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };

  async function sendData(e) {
    handleSubmit(e);
    e.preventDefault();
    const form = e.currentTarget;

    if (form.checkValidity() === false) {
      await e.stopPropagation();
    } else {
      setValidated(true);

      const response = await fetch("http://localhost:8070/staff/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          nic,
          role,
          // photoURL,
        }),
      });

      const data = await response.json();

      if (data.status === "ok") {
        const response1 = await fetch(
          "http://localhost:8070/user/staff/register",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              name,
              email,
              role,
              password: nic,
            }),
          }
        );

        const data1 = await response1.json();

        if (data1.status === "ok") {
          alert("User Registered Successfully");
          setValidated(true);
        } else if (data1.error === "Invalid name") {
          alert("Invalid name");
        } else if (data1.error === "Invalid email") {
          alert("Invalid email");
        } else if (data1.error === "Invalid password") {
          alert("Password should be more than 5 characters");
        } else {
          alert("Error! Email already exists");
        }

        alert("Staff Member was added Successfully");
        window.location.reload(false);
      } else if (data.error === "Invalid name") {
        alert("Invalid name");
      } else if (data.error === "Invalid email") {
        alert("Invalid email");
      } else if (data.error === "Invalid nic") {
        alert("Invalid nic");
      } else if (data.error === "Invalid specialization") {
        alert("Invalid specialization");
      } else if (data.error === "Invalid experience") {
        alert("Invalid experience");
      } else {
        alert("Error! Email already exists");
      }
    }
  }

  return (
    <div className="container">
      <Form noValidate validated={validated} onSubmit={sendData}>
        <Row className="mb-3">
          <Form.Group as={Col} md="6" controlId="registerName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              required
              minLength={3}
              type="text"
              placeholder="Your name"
              onChange={(event) => setName(event.target.value)}
            />
            <Form.Control.Feedback type="invalid" isInvalid={name.length < 3}>
              {name.length === 0
                ? "Name is required"
                : "Name should be atleast three characters"}
            </Form.Control.Feedback>
            <Form.Control.Feedback
              isValid={name.length >= 3}
            ></Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="6" controlId="registerEmail">
            <Form.Label>Email</Form.Label>
            <InputGroup hasValidation>
              <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
              <Form.Control
                required
                type="email"
                placeholder="Email"
                aria-describedby="inputGroupPrepend"
                onChange={(event) => setEmail(event.target.value)}
              />
              <Form.Control.Feedback
                type="invalid"
                isInvalid={
                  !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)
                }
              >
                {email.length === 0
                  ? "Email is required"
                  : "Please enter a valid email"}
              </Form.Control.Feedback>
              <Form.Control.Feedback
                isValid={
                  !!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)
                }
              ></Form.Control.Feedback>
            </InputGroup>
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} md="6" controlId="registerNIC">
            <Form.Label>NIC</Form.Label>
            <InputGroup hasValidation>
              <Form.Control
                required
                minLength={10}
                type="text"
                placeholder="NIC"
                aria-describedby="inputGroupPrepend"
                onChange={(event) => setNIC(event.target.value)}
              />
              <Form.Control.Feedback
                type="invalid"
                isInvalid={!/^([0-9]{9}[x|X|v|V]|[0-9]{12})$/i.test(nic)}
              >
                {nic.length === 0
                  ? "NIC is required"
                  : "Please enter a valid NIC"}
              </Form.Control.Feedback>
              <Form.Control.Feedback
                isValid={!!/^([0-9]{9}[x|X|v|V]|[0-9]{12})$/i.test(nic)}
              ></Form.Control.Feedback>
            </InputGroup>
          </Form.Group>
          <Form.Group as={Col} md="6" controlId="registerSpec">
            <Form.Label>Designation</Form.Label>
            <InputGroup hasValidation>
              <Form.Control
                required
                type="text"
                minLength={3}
                placeholder="Designation"
                aria-describedby="inputGroupPrepend"
                onChange={(event) => setRole(event.target.value)}
              />
              <Form.Control.Feedback type="invalid" isInvalid={role.length < 3}>
                {role.length === 0
                  ? "Designation is required"
                  : "Designation should be atleast three characters"}
              </Form.Control.Feedback>
              <Form.Control.Feedback
                isValid={role.length >= 3}
              ></Form.Control.Feedback>
            </InputGroup>
          </Form.Group>
        </Row>
        {/* <Form.Group as={Col} md="6" controlId="registerPhoto">
            <Form.Label>Profile Image</Form.Label>
            <InputGroup hasValidation>
              <Form.Control
                type="file"
                aria-describedby="inputGroupPrepend"
                onChange={(event) => setPhotoURL(event.target.files[0])}
              />
            </InputGroup>
          </Form.Group> */}
        <Button type="submit">Add</Button>
      </Form>
    </div>
  );
}
