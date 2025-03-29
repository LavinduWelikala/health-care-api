import React, { useState, useEffect } from "react";
import { Table, Card, Row, Col, Button,Form,Modal } from "react-bootstrap";
import axios from "axios";
import style from "../styles/circle.css"
import { useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import "jspdf-autotable";


function Analytics() {
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

    const generateorderReport = () => {
        const doc = new jsPDF();
        const title = "Data Report";
        doc.setFontSize(15);
        doc.setTextColor(128, 0, 0);
        doc.text(title, 100, 10, null, null, "center");
        doc.setTextColor(0);
        doc.setFontSize(12);

        doc.setFontSize(8);
        doc.text(
            `*This Report is automatically generated.`,
            20,
            35,
            null,
            null
        );

        const headers = [
            [
                "Name",
                "User Id",
                "Subject",
                "Request Type",
                "Message",
                "Date Created",
                "Status",
               
            ],
        ];

        const data = ticket.filter(ticket => {
            if ( ticket.requesttype==="Doctor's Issue") {
                return ticket
            }
          
        }).map((ticket, index) => [
            index,
            ticket.name,
            ticket.userId,
            ticket.ticketID,
            ticket.requesttype,
            ticket.message,
            ticket.date,
            ticket.status

        ]);
        let contents = {
            startY: 20,
            head: headers,
            body: data,
        };
        doc.autoTable(contents);
        doc.save("Data_Report.pdf");
    };



 
    return (
        <div>
            <Row>
                <Col sm={2} style={{ backgroundColor: '#cccccc', height: '100vh' }}>
                    <div style={{ paddingTop: '10vh', paddingLeft: '3vh' }}>
                        <a style={{textDecoration:'none'}} href="/support-home"><h5 style={{ color: 'gray' }} >Tickets</h5></a>
                        <br />
                        <h5 >Analytics</h5>
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
                                                 <Button variant="success"  onClick={() => generateorderReport()}>Download Report</Button>

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
    
                                            </tr>
                                        </thead>
                                        <tbody>

                                            {ticket.filter(ticket => {
                                                if (search === "" && ticket.requesttype==="Doctor's Issue") {
                                                    return ticket
                                                }
                                                
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
export default Analytics;



