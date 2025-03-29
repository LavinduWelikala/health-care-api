import React, { useState, useEffect } from 'react'


import { Card, Button, Form, Modal, Row, Col } from 'react-bootstrap';
import axios from "axios";
import FileBase from "react-file-base64";
import NavBar from './NavBar';


export default function Addticket() {
  const [name, setname] = useState("");
  const [userId, setuserId] = useState("");
  const [ticketID, setticketID] = useState(" ");
  const [contact, setcontact] = useState(" ");
  const [requesttype, setrequesttype] = useState(" ");
  const [message, setmessage] = useState(" ");
  const [fileEnc, fileEncData] = useState(" ");
  const [show, setShow] = useState(false);
  const [date, setaddeddate] = useState(" ");
  const [status, setstatus] = useState(" ");
  const email = localStorage.getItem('userEmail');
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  var [adddate, setDate] = useState(new Date());

  useEffect(() => {
    var timer = setInterval(() => setDate(new Date()), 1000)
    return function cleanup() {
      clearInterval(timer)
      const putdate = adddate.toLocaleDateString();
      setaddeddate(putdate);
    }

  });

  function sendData(e) {


    e.preventDefault();

    const newTicket = {
      name,
      userId,
      ticketID,
      email,
      contact,
      requesttype,
      message,
      fileEnc,
      date,
      status
    }

    axios.post("http://localhost:8070/ticket/", newTicket).then(() => {
      ("Ticket  added")
      setname('');
      setuserId('');
      setticketID('');
      setcontact('');
      setrequesttype('');
      setmessage('');
      fileEncData('');
      setaddeddate('');
      setstatus('');

      alert("Ticket added ..");
      window.location = '/user-ticket/view'

    }).catch((err) => {
      alert("error");
    })
  }
  function refreshPage() {
    window.location.reload(false);
  }


  return (
    <div>
      <NavBar />


      <div style={{ paddingLeft: '5vh', paddingTop: '1vh', paddingBottom: '5vh', paddingRight: '5vh' }}>
        <Button variant="primary" size="lg" onClick={handleShow} style={{ float: 'right' }}>
          RAISE TICKET
        </Button>

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Raise Ticket</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Card style={{
            }} >
              <Card.Body>


                <Form onSubmit={sendData}>

                  <br />
                  <div >
                    <Row>
                      <Col>
                        <Form.Group className="mb-3" controlId="name">
                          <Form.Label>Name:</Form.Label>
                          <Form.Control type="text" name='name'
                            onChange={(e) => setname(e.target.value)}
                            placeholder=" Name  .." required />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="userid">
                          <Form.Label >user ID : </Form.Label>
                          <Form.Control type="text"
                            onChange={(e) => setuserId(e.target.value)}

                            placeholder=" User id .." />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                          <Form.Label > Contact Number: </Form.Label>
                          <Form.Control type="number"
                            onChange={(e) => setcontact(e.target.value)}
                            placeholder=" Contact Number .." required />
                        </Form.Group>
                      </Col>
                      <Col>

                        <Form.Group className="mb-3" controlId="ticketid">
                          <Form.Label >Subject : </Form.Label>
                          <Form.Control type="text"
                            onChange={(e) => setticketID(e.target.value)}

                            placeholder=" Subject .." required />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="ticketid">

                          <Form.Label>Request Type : </Form.Label >
                          <Form.Select aria-label="Default select example"
                            onChange={(e) => setrequesttype(e.target.value)} >
                            <option value='Select Country'>Select Type</option>

                            <option value="Doctor's Issue">Doctor's Issue</option>
                            <option value="Payment Issue">Payment Issue</option>
                            <option value="Appointment Issue">Appointment Issue</option>
                            
                          </Form.Select>
                        </Form.Group>

                        
                      </Col>

                    </Row>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label > Message: </Form.Label>
                      <Form.Control type="text" as="textarea" rows={3}
                        onChange={(e) => setmessage(e.target.value)}
                        placeholder=" Message .." required />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label > Date: </Form.Label>
                      <Form.Control type="text"
                        value={adddate.toLocaleDateString()}
                        disabled />
                    </Form.Group>

                    <Form.Group controlId="fileupload">
                      <Form.Label> Attachment</Form.Label>
                      <h6>**Please do not exceed the amount of file size 50MB </h6>
                      <FileBase
                        type="file"
                        multiple={false}
                        onDone={({ base64 }) => {
                          fileEncData(base64);
                        }}
                      />

                    </Form.Group>

                  </div>

                  <div style={{ paddingLeft: "40%" }}>
                    <Button type="submit" variant="success">Submit</Button>{' '} {' '}<Button variant="danger" onClick={refreshPage}>Clear</Button>

                  </div>
                </Form>

              </Card.Body>
            </Card>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>

          </Modal.Footer>
        </Modal>
        <div style={{ paddingTop: '10vh' }}>

          <b><h1>Get tickets into the right hands in seconds</h1></b>
          <br />
          <div style={{ paddingLeft: '10vh', paddingRight: '2vh' }}>
            <h3>Introduction</h3><br />
          </div>
          <div style={{ paddingLeft: '15vh', paddingRight: '2vh' }}>
            <h5>1. Login: The first step is to log in to your account using your credentials. If you don't have an account, you can create one by clicking on the
              "Register" button.<br />
              2. Submit a Ticket: Once you are logged in, you can submit a ticket by clicking on the "Submit a Ticket" button. This will take you to the ticket submission form.<br />
              3. Select Inquiry Type: In the ticket submission form, you can select the type of inquiry you have from a drop-down list.<br />
              4. Provide Details: After selecting the inquiry type, you can provide details about your inquiry in the text box provided. You can describe your issue in detail, attach files, and provide any relevant information that will help the support team resolve your issue.<br />
              5. Submit Ticket: Once you have provided all the necessary information, you can click on the "Submit" button to submit your ticket. You will receive a confirmation message indicating that your ticket has been successfully submitted</h5>
          </div>
        </div>


      </div><br />


    </div>
  );
}
