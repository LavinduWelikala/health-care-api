import React, { useState, useEffect } from "react";
import { Table, Button, Card, Modal, Form, Row, Col } from "react-bootstrap";
import axios from "axios";
import { FaPencilAlt, FaTrashAlt,FaCloudDownloadAlt } from "react-icons/fa";
import NavBar from "./NavBar";

function ViewTicket(props) {
    const [ticket, setticket] = useState([]);
    const [search, setSearch] = useState("");
    const [name, setname] = useState("");
    const [userId, setuserId] = useState("");
    const [ticketID, setticketID] = useState(" ");
    const [email, setemail] = useState(" ");
    const [contact, setcontact] = useState(" ");
    const [requesttype, setrequesttype] = useState(" ");
    const [message, setmessage] = useState(" ");
    const [fileEnc, fileEncData] = useState(" ");
    const [_id, setid] = useState(" ");
    const [show, setShow] = useState(false);
    const [status, setstatus] = useState(false);
    
    

    const emails=localStorage.getItem('userEmail');

    const handleClose = () => setShow(false);
    const handleShow = (_id, name,
        userId,
        ticketID,
        email,
        contact,
        requesttype,
        message,
        status,
        fileEnc
    ) => {
        setShow(true);
        setid(_id);
        setname(name);
        setuserId(userId);
        setticketID(ticketID);
        setstatus(status);
        setemail(email);
        setcontact(contact);
        setrequesttype(requesttype);
        setmessage(message);
        fileEncData(fileEnc);
    }

console.log(search)

    useEffect(() => {

        //get funtion
        function getticket() {
            axios.get("http://localhost:8070/ticket/").then((res) => {
                setticket(res.data.allticket);
            }).catch((err) => {
                alert(err.message);
            })

        }
        getticket();

    }, [])

    //delete funtion
    function onDelete(_id) {
        console.log(_id);
        axios.delete("http://localhost:8070/ticket/" + _id).then((res) => {
            alert('Deleted Successfully');
            window.location.reload();
        }).catch((err) => {
            alert(err.message);
        })
    }

    const updateUser = (e) => {
        e.preventDefault();
        update(e)
    };


    function update() {
        const newData = {
            name,
            userId,
            ticketID,
            email,
            contact,
            requesttype,
            message,
            status

        }

        axios.put("http://localhost:8070/ticket/" + _id, newData).then(() => {
            setname('');
            setuserId('');
            setticketID('');

            setemail('');
            setcontact('');
            setrequesttype('');
            setmessage('');

            alert("Updated Successfully");
            window.location.reload();
        }).catch((err => {
            alert(err)
        }))


        console.log(fileEnc)
    }
    return (
        <div>
            <NavBar/>
            <div style={{ paddingLeft: "1vh", color: 'white' }}>

            </div>
            <div style={{ paddingLeft: '6vh', paddingRight: '7vh', paddingBottom: '2vh',paddingTop:'5vh' }}>
                <Card border="secondary">
                    <div style={{ paddingBottom: "8vh", paddingTop: "1vh", paddingLeft: "8vh", paddingRight: "5vh" }}>
                        <div style={{ paddingBottom: "5vh", paddingTop: "3vh", paddingLeft: "5vh", paddingRight: "5vh" }}>
                            <h1 style={{  paddingBottom: "3vh" }}>My Tickets</h1>


                            <div style={{ paddingleft: "10vh", paddingBottom: "1vh", paddingTop: "1vh" }} >

                                <div style={{ paddingleft: "2vh", paddingBottom: "1vh", paddingTop: "1vh" }}>
                                    <div style={{ paddingBottom: "1vh", paddingTop: "1vh" }}>
                                        <input type="text" placeholder="Search from 'Name' " className="mr-2"
                                            onChange={(e) => {
                                                setSearch(e.target.value);
                                            }} />
                                    </div>

                                </div>

                            </div>
                            <Table striped bordered hover size="sm" variant="light" >
                                <thead>

                                    <tr>
                                        <th>Name</th>
                                        <th>User Id</th>
                                        <th>Subject</th>
                                        <th>Email</th>
                                        <th>Contact</th>
                                        <th>Request Type</th>
                                        <th>Message</th>  
                                        <th>Attachment</th>
                                        <th>Date Created</th>
                                        <th>Status</th>
                                        <th>Edit</th>
                                        <th>Delete</th>
                                    </tr>
                                </thead>
                                <tbody>

                                    {ticket.filter(ticket => {
                                        if (search === "" && emails===ticket.email) {
                                            return ticket
                                        }
                                        else if (ticket.name.toLowerCase().includes(search.toLowerCase()) && emails===ticket.email) {
                                            return ticket
                                        }
                                        return null;
                                    }).map((ticket) => {

                                            return (
                                                <tr key={ticket._id}>
                                                    <td>{ticket.name}</td>
                                                    <td>{ticket.userId}</td>
                                                    <td>{ticket.ticketID}</td>
                                                    <td>{ticket.email}</td>
                                                    <td>{ticket.contact}</td>
                                                    <td>{ticket.requesttype}</td>
                                                    <td>{ticket.message}</td>
                                                    <td>
                                                   <a href={ticket.attachment.imageSecURL} target="_blank" rel="noreferrer">
                                                   <Button variant="outline-dark"> View <FaCloudDownloadAlt/></Button>
                                                    </a> 

                                                        </td>
                                                        <td>{ticket.date}</td>
                                                    <td>{ticket.status}</td>

                                                    <td>
                                                        <Button variant="outline-success" onClick={() => handleShow(ticket._id, ticket.name, ticket.userId, ticket.ticketID, ticket.email, ticket.contact, ticket.requesttype, ticket.message,ticket.status)} ><FaPencilAlt /></Button>
                                                    </td>

                                                    <td>
                                                        <Button variant="outline-danger" onClick={() => onDelete(ticket._id)}><FaTrashAlt /></Button>

                                                    </td>
                                                </tr>

                                            );
                                        })}

                                </tbody>

                            </Table >

                        </div>
                    </div>



                </Card>

            </div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Details </Modal.Title>

                </Modal.Header>
                <Modal.Body>
                    <Form >
                        <Row>
                            <Col>
                                <Form.Group className="mb-3" controlId="name">
                                    <Form.Label>Name:</Form.Label>
                                    <Form.Control type="text" name='name'
                                        value={name}
                                        onChange={(e) => setname(e.target.value)}
                                        placeholder=" Name  .." required />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="userid">
                                    <Form.Label >user ID : </Form.Label>
                                    <Form.Control type="text"
                                        value={userId}
                                        onChange={(e) => setuserId(e.target.value)}

                                        placeholder=" User id .." />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label > Contact Number: </Form.Label>
                                    <Form.Control type="number"
                                        value={contact}
                                        onChange={(e) => setcontact(e.target.value)}
                                        placeholder=" Contact Number .." required />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label >Email : </Form.Label>
                                    <Form.Control type="email"
                                        value={email}
                                        onChange={(e) => setemail(e.target.value)}
                                        placeholder=" Email  .." required />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="ticketid">
                                    <Form.Label >Subject : </Form.Label>
                                    <Form.Control type="text"
                                        value={ticketID}
                                        onChange={(e) => setticketID(e.target.value)}

                                        placeholder=" Subject  .." required />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label > Request Type: </Form.Label>
                                    <Form.Control type="text"
                                        value={requesttype}
                                        onChange={(e) => setrequesttype(e.target.value)}
                                        placeholder=" Request Type .." required />
                                </Form.Group>
                            </Col>

                        </Row>

                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label > Message: </Form.Label>
                            <Form.Control type="text" as="textarea" rows={3}
                                onChange={(e) => setmessage(e.target.value)}
                                value={message}
                                placeholder=" Message .." required />
                        </Form.Group>
                        <div style={{ paddingBottom: '2vh', paddingTop: '2vh' }}>

                            <Button variant="outline-danger" type="submit" onClick={(e) => updateUser(e)}>Edit</Button>
                            {' '}<Button variant="secondary" onClick={handleClose}>
                                Close
                            </Button>
                        </div >

                    </Form>
                </Modal.Body>

            </Modal>
        </div>


    );

}
export default ViewTicket;



