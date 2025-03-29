import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Nav from "react-bootstrap/Nav";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";
import { useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";

function Login({ closeModal }) {
  const [chooseLogin, setChooseLogin] = useState(true);
  const [validated, setValidated] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [username, setUsername] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const navigate = useNavigate();

  function login() {
    setChooseLogin(true);
    setName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  }

  function register() {
    setChooseLogin(false);
    setUsername("");
    setUserPassword("");
  }

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };

  // Manipulating data in registration form
  async function handleRegister(event) {
    handleSubmit(event);
    event.preventDefault();
    const form = event.currentTarget;

    if (form.checkValidity() === false) {
      await event.stopPropagation();
    } else {
      setValidated(true);

      const response = await fetch("http://localhost:8070/user/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          password,
          confirmPassword,
        }),
      });

      const data = await response.json();

      if (data.status === "ok") {
        alert("User Registered Successfully");
        setValidated(false);
        setChooseLogin(true);
      } else if (data.error === "Invalid name") {
        alert("Invalid name");
      } else if (data.error === "Invalid email") {
        alert("Invalid email");
      } else if (data.error === "Invalid password") {
        alert("Password should be more than 5 characters");
      } else if (data.error === "Password does not match") {
        alert("Password does not match");
      } else {
        alert("Error! Email already exists");
      }
    }
  }

  async function handleLogin(event) {
    handleSubmit(event);
    event.preventDefault();
    const form = event.currentTarget;

    if (form.checkValidity() === false) {
      await event.stopPropagation();
    } else {
      setValidated(true);

      const response = await fetch("http://localhost:8070/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username,
          userPassword,
        }),
      });

      const data = await response.json();

      if (data.user) {
        localStorage.setItem("token", data.user);

        const token = localStorage.getItem("token");
        if (token) {
          const user = jwtDecode(token);
          if (user) {
            localStorage.setItem("userRole", user.role);
            localStorage.setItem("userEmail", user.email);
            localStorage.setItem("userName", user.name);
          }
        }
        alert("User Login Successful");
        closeModal(false);
        const role = localStorage.getItem("userRole");

        if (role === "doctor") {
          navigate("/quiz");
        } else if (role === "admin") {
          navigate("/admin/accounts");
        } else if (role === "pharmacist") {
          navigate("/dashboard");
        } else if (role === "support agent") {
          navigate("/support-home");
        } else {
          navigate("/user-dashboard");
        }
      } else if (data.error === "Invalid email") {
        alert("Invalid email");
      } else if (data.error === "Invalid password") {
        alert("Password should be more than 5 characters");
      } else if (data.error === "User not found") {
        alert("Error!User not found");
      } else if (data.error === "Incorrect Password") {
        alert("Error!Incorrect Password");
      }
    }
  }

  return (
    <>
      <Modal show onHide={() => closeModal(false)}>
        <Modal.Header closeButton>
          <Nav variant="tabs" defaultActiveKey="login">
            <Nav.Item>
              <Nav.Link eventKey="login" onClick={login}>
                Login
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="signup" onClick={register}>
                SignUp
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </Modal.Header>
        <Modal.Body>
          {!chooseLogin && (
            <div>
              <Form noValidate validated={validated} onSubmit={handleRegister}>
                <Row className="mb-3">
                  <Form.Group as={Col} md="12" controlId="registerName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      required
                      minLength={3}
                      type="text"
                      placeholder="Your name"
                      onChange={(event) => setName(event.target.value)}
                    />
                    <Form.Control.Feedback
                      type="invalid"
                      isInvalid={name.length < 3}
                    >
                      {name.length === 0
                        ? "Name is required"
                        : "Name should be atleast three characters"}
                    </Form.Control.Feedback>
                    <Form.Control.Feedback
                      isValid={name.length >= 3}
                    ></Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group as={Col} md="12" controlId="registerEmail">
                    <Form.Label>Email</Form.Label>
                    <InputGroup hasValidation>
                      <InputGroup.Text id="inputGroupPrepend">
                        @
                      </InputGroup.Text>
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
                          !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(
                            email
                          )
                        }
                      >
                        {email.length === 0
                          ? "Email is required"
                          : "Please enter a valid email"}
                      </Form.Control.Feedback>
                      <Form.Control.Feedback
                        isValid={
                          !!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(
                            email
                          )
                        }
                      ></Form.Control.Feedback>
                    </InputGroup>
                  </Form.Group>
                  <Form.Group as={Col} md="12" controlId="registerPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      required
                      minLength={5}
                      type="password"
                      placeholder="Password"
                      onChange={(event) => setPassword(event.target.value)}
                    />
                    <Form.Control.Feedback
                      type="invalid"
                      isInvalid={password.length < 5}
                    >
                      {password.length === 0
                        ? "Password is required"
                        : "Password should be atleast five characters"}
                    </Form.Control.Feedback>
                    <Form.Control.Feedback
                      isValid={password.length >= 5}
                    ></Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group
                    as={Col}
                    md="12"
                    controlId="registerConfirmPassword"
                  >
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                      required
                      minLength={5}
                      type="password"
                      placeholder="Confirm Password"
                      onChange={(event) =>
                        setConfirmPassword(event.target.value)
                      }
                    />
                    <Form.Control.Feedback
                      type="invalid"
                      isInvalid={
                        confirmPassword !== password ||
                        confirmPassword.length === 0
                      }
                    >
                      {password.length === 0
                        ? "Confirm password is required"
                        : "Confirm password does not match"}
                    </Form.Control.Feedback>
                    <Form.Control.Feedback
                      isValid={confirmPassword === password}
                    ></Form.Control.Feedback>
                  </Form.Group>
                </Row>
                <Button type="submit">Sign Up</Button>
              </Form>
            </div>
          )}
          {chooseLogin && (
            <div>
              <Form noValidate validated={validated} onSubmit={handleLogin}>
                <Row className="mb-3">
                  <Form.Group as={Col} md="12" controlId="email">
                    <Form.Label>Email</Form.Label>
                    <InputGroup hasValidation>
                      <InputGroup.Text id="inputGroupPrepend">
                        @
                      </InputGroup.Text>
                      <Form.Control
                        onChange={(event) => setUsername(event.target.value)}
                        type="email"
                        placeholder="Email"
                        aria-describedby="inputGroupPrepend"
                        required
                      />
                      <Form.Control.Feedback
                        type="invalid"
                        isInvalid={
                          !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(
                            username
                          )
                        }
                      >
                        {username.length === 0
                          ? "Email is required"
                          : "Please enter a valid email"}
                      </Form.Control.Feedback>
                      <Form.Control.Feedback
                        isValid={
                          !!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(
                            username
                          )
                        }
                      ></Form.Control.Feedback>
                    </InputGroup>
                  </Form.Group>
                  <Form.Group as={Col} md="12" controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      required
                      minLength={5}
                      type="password"
                      placeholder="Password"
                      onChange={(event) => setUserPassword(event.target.value)}
                    />
                    <Form.Control.Feedback
                      type="invalid"
                      isInvalid={userPassword.length < 5}
                    >
                      {userPassword.length === 0
                        ? "Password is required"
                        : "Password should be atleast five characters"}
                    </Form.Control.Feedback>
                    <Form.Control.Feedback
                      isValid={userPassword.length >= 5}
                    ></Form.Control.Feedback>
                  </Form.Group>
                </Row>
                <Button type="submit">Login</Button>
              </Form>
            </div>
          )}
        </Modal.Body>
      </Modal>
    </>
  );
}

export default Login;
