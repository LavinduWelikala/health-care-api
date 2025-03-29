import React, { useState, useEffect } from "react";
import { Table, Card, Row, Col, Button,Form,Modal } from "react-bootstrap";
import axios from "axios";
import style from "../styles/circle.css"
import { useNavigate } from "react-router-dom";

function Tickets() {
    const navigate = useNavigate();
    const [ticket, setticket] = useState([]);
    const [search, setSearch] = useState("");

    const [name, setname] = useState("");
    const [userId, setuserId] = useState("");
    const [ticketID, setticketID] = useState(" ");
    const [email, setemail] = useState(" ");
    const [contact, setcontact] = useState(" ");
    const [requesttype, setrequesttype] = useState(" ");
    const [message, setmessage] = useState(" ");
    const [_id, setid] = useState(" ");
    const [show, setShow] = useState(false);
    const [status, setstatus] = useState(" ");
    const handleClose = () => setShow(false);
    const handleShow = (_id, name,
        userId,
        ticketID,
        email,
        contact,
        requesttype,
        message,
        status,
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
    }

    useEffect(() => {

        //get funtion
        function getticket() {
            axios.get("http://localhost:8070/ticket/").then((res) => {
                setticket(res.data.allticket);
                console.log(res.data.allticket);
            }).catch((err) => {
                alert(err.message);
            })
        }
        getticket();
    }, [])

    function removeUser() {
        localStorage.removeItem("userRole");
        navigate("/");
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


    }
    return (
        <div>
            <Row>
                <Col sm={2} style={{ backgroundColor: '#cccccc', height: '100vh' }}>
                    <div style={{ paddingTop: '10vh', paddingLeft: '3vh' }}>
                        <h5 >Tickets</h5>
                        <br />
                        <a style={{textDecoration:'none'}} href="/supporthome-analytics"><h5  style={{ color: 'gray' }}>Analytics</h5></a>
                    </div>
                    <div style={{ paddingTop: '10vh', paddingLeft: '3vh' }}>
                        <h5 style={{ color: 'gray' }}>All Tickets</h5>
                        <h6> <span className="orange-circle" style={style} /> In Progress</h6>
                        <h6> <span className="yellow-circle" style={style} /> Check</h6>
                        <h6> <span className="green-circle" style={style} /> Completed</h6>
                        <h6> <span className="blue-circle" style={style} /> New</h6>

                    </div>
                    <div style={{ paddingTop: '10vh', paddingLeft: '3vh' }}>
                        <a style={{ color: 'gray', cursor: "pointer", fontSize: "20px", fontWeight: "bold", textDecoration: "none" }} onClick={removeUser} href="/">Log out</a>
                    </div>
                </Col>

                <Col sm={10}>
                    <div style={{ paddingLeft: "1vh", color: 'white' }}>

                    </div>
                    <div style={{ paddingLeft: '6vh', paddingRight: '7vh', paddingBottom: '2vh', paddingTop: '5vh' }}>
                        <Card border="secondary">
                            <div style={{ paddingBottom: "8vh", paddingTop: "1vh", paddingLeft: "8vh", paddingRight: "5vh" }}>
                                <div style={{ paddingBottom: "5vh", paddingTop: "3vh", paddingLeft: "5vh", paddingRight: "5vh" }}>


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
                                                <th>Request Type</th>
                                                <th>Message</th>
                                                <th>Date Created</th>
                                                <th>Status</th>
                                                <th>change</th>
    
                                            </tr>
                                        </thead>
                                        <tbody>

                                            {ticket.filter(ticket => {
                                                if (search === "") {
                                                    return ticket
                                                }
                                                else if (ticket.name.toLowerCase().includes(search.toLowerCase())) {
                                                    return ticket
                                                }
                                                return ticket
                                            }).map((ticket) => {

                                                return (
                                                    <tr key={ticket._id}>
                                                        <td>{ticket.name}</td>
                                                        <td>{ticket.userId}</td>
                                                        <td>{ticket.ticketID}</td>
                                                        <td>{ticket.requesttype}</td>
                                                        <td>{ticket.message}</td>
                                                        <td>{ticket.date}</td>
                                                        <td>{ticket.status}</td>

                                                        <td>
                                                            <Button variant="outline-success" onClick={() => handleShow(ticket._id, ticket.name, ticket.userId, ticket.ticketID, ticket.email, ticket.contact, ticket.requesttype, ticket.message, ticket.status)} >change</Button>

                                                            <Modal show={show} onHide={handleClose}>
                                                                <Modal.Header closeButton>
                                                                    <Modal.Title>Edit Status </Modal.Title>

                                                                </Modal.Header>
                                                                <Modal.Body>
                                                                    <Form >
                                                                        <Form.Group className="mb-3" controlId="ticketid">

                                                                            <Form.Label>Status  : </Form.Label >
                                                                            <Form.Select aria-label="Default select example"
                                                                                onChange={(e) => setstatus(e.target.value)} >
                                                                                <option value='Select Country'>Select Status</option>

                                                                                <option value="Complete">Complete</option>
                                                                                <option value="Not Complete">Not Complete</option>
                                                                                <option value="Pending">Pending</option>



                                                                            </Form.Select>
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


                </Col>
            </Row>

        </div>


    );

}
export default Tickets;



