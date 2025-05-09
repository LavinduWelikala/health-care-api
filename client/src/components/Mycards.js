// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import axios from "axios";
// //import NavBar from "./NavBar";

// import Container from "react-bootstrap/Container";
// import Row from "react-bootstrap/Row";
// import Col from "react-bootstrap/Col";

// import { Document, Page, Text, View, StyleSheet, PDFDownloadLink } from '@react-pdf/renderer';

// function Mycards() {
//   const [column, setColumns] = useState([]);
//   const [payments, setPayment] = useState([]);
//   const [searchQuery, setSearchQuery] = useState('');

//   async function deletePayment(id) {
//     const confirmed = window.confirm(
//       "Are you sure you want to delete this payment?"
//     );
//     if (confirmed) {
//       try {
//         const response = await axios.delete(
//           `http://localhost:8070/ipayments/delete/${id}`
//         );
//         alert("Payment successfully deleted.");
//         window.location = "/view-payment";
//       } catch (err) {
//         console.error(err);
//         alert("An error occurred while deleting the payment.");
//       }
//     } else {
//       window.location = "/view-payment";
//     }
//   }



//   useEffect(() => {
//     function getPayment() {
//       axios
//         .get("http://localhost:8070/ipayments/")
//         .then((res) => {
//           const filteredPayments = res.data.filter((payment) =>
//                 payment.Cholder.toLowerCase().includes(searchQuery.toLowerCase()) ||
//                 payment.date.toLowerCase().includes(searchQuery.toLowerCase()) ||
//                 payment.cvv.toLowerCase().includes(searchQuery.toLowerCase()) ||
//                 (typeof payment.Cnumber === 'string' && payment.phonenumber.toLowerCase().includes(searchQuery.toLowerCase())) 
                

//               );
//               setPayment(filteredPayments);
//         })
//         .catch((err) => {
//           alert(err.message);
//         });
//     }
//     getPayment();
//   }, [[searchQuery]]);

//   const handleSearch = (event) => {
//     setSearchQuery(event.target.value);
//   }

//   const filteredPaymentList = payments.filter((payment) => {
//     return (
//       payment.Cholder.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       payment.date.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       payment.cvv.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       (typeof payment.Cnumber === 'string' && payment.phonenumber.toLowerCase().includes(searchQuery.toLowerCase()))
//     )
//   })

//   const styles = StyleSheet.create({
//     page: {
//         backgroundColor: '#ffffff',
//         padding: 20
//     },
//     section: {
//         margin: 10,
//         padding: 10,
//         flexGrow: 1
//     },
//     tableHeader: {
//         backgroundColor: '#f2f2f2'
//     },
//     tableRow: {
//         flexDirection: 'row'
//     },
//     tableCell: {
//         padding: 5
//     }
//   });


//   // pdf

//   const PaymentDocument = () => (
//     <Document>
//         <Page size="A3" style={styles.page}>
//             <View style={styles.section}>
//                 <Text style={{ fontSize: 10, marginBottom: 10 }}>Payment List</Text>
//                 <View style={[styles.tableRow, styles.tableHeader]}>
//                     <Text style={[styles.tableCell, { flex: 1 }]}>ID</Text>
//                     <Text style={[styles.tableCell, { flex: 4 }]}>Cholder Name</Text>
//                     <Text style={[styles.tableCell, { flex: 20 }]}>Cnumber Count</Text>
//                     <Text style={[styles.tableCell, { flex: 4 }]}>Date</Text>
//                     <Text style={[styles.tableCell, { flex: 4 }]}>cvv</Text>           
                
//                 </View>
//                 {payments.map((item,index) => (
//                     <View key={index} style={[styles.tableRow, { borderBottom: '1 solid #ccc' }]}>
//                         <Text style={[styles.tableCell, { flex: 1 }]}>{index+1}</Text>
//                         <Text style={[styles.tableCell, { flex: 4 }]}>{item.Cholder}</Text>
//                         <Text style={[styles.tableCell, { flex: 20 }]}>{item.Cnumber}</Text>
//                         <Text style={[styles.tableCell, { flex: 4 }]}>{item.date}</Text>
//                         <Text style={[styles.tableCell, { flex: 4 }]}>{item.cvv}</Text>
//                     </View>
//                 ))}
//             </View>
//         </Page>
//     </Document>
//   );

//   return (



// //serch bar


//     <div>
// <div className="row bg-primary">
// <div className="search-container">
//                 <input type="text" placeholder="Search..." onChange={handleSearch} 
//                 style={{
//                     borderRadius: "10px",
//                     border:0,
//                     paddingLeft:"15px",
//                     marginTop: "20px",
//                     alignItems:"center",
//                     marginBottom: "30px",
//                     width: "20%",
//                     marginLeft: "50px",
//                     boxShadow: " 3px 3px 3px rgba(150, 168, 156)",
//                     backgroundColor: "#f9f9f9",
//                   }}/>
//             </div>
       
//           <button className="btn btn-success" style={{ margin: '0 0'}}>
//                 <PDFDownloadLink style={{ margin: '0 0', textDecoration: 'none', color: '#f9f9f9'}} document={<PaymentDocument />} fileName="Payment-document.pdf">
//                     {({ blob, url, loading, error }) =>
//                     loading ? 'Loading document...' : 'Download Payment report now!'
//                     }
//                 </PDFDownloadLink>
//           </button>
// </div>
      
            
//       <div>
//         <Container className="my-5" style={{ width: "70%" }}>
//           <Row className="align-items-center">
//             <Col md={12}>
//               <h2 className="mb-3">
//               Save your credit card information for upcoming purchases!
//               </h2>
//               <p style={{ fontSize: "17px" }}>
//                 It's important to note that we take the security of your
//                 personal and financial information very seriously. Our website
//                 uses industry-standard encryption technology to protect your
//                 data and ensure that it is kept confidential. Additionally, we
//                 never store your full card number on our servers - instead, we use
//                  a secure tokenization process to encrypt and store your card
//                 details.
//                We take the security of your personal and financial information very seriously, it is vital to emphasize. In order
//                to safeguard your information and preserve its confidentiality, our website employs industry-standard 
//                encryption technology. Additionally, we never save your complete card number on our systems; instead, we encrypt
//                 and store your card information using a safe tokenization technique.
//               </p>
//               <p style={{ fontSize: "17px" }}>
//                 If you have any concerns or questions about our payment security
//                 measures or how to save your card details, please don't hesitate
//                 to contact us via phone or email. Our customer support team is
//                 available 24/7 to assist you and address any issues you may
//                 encounter.
//               </p>
//             </Col>
//           </Row>
//         </Container>
//       </div>
      
        
//       <div class="container" style={{ marginBottom: "50px",   }}>
//         <div className="container">
//           <div className="text-center">
//           <a  className="btn btn-primary " href={"/add-payment/"} style = {{textDecoration:"none"}}>
//        <i class="fas fa-edit">&nbsp; Add Payment +</i>
//         </a> 
//           </div>
//        </div>
       
//         <div class="row">
//           <div class="col-12"> 
//             <center>
//               <h1>Payment Details</h1>
//             </center>
//             <center>
//               <h2>MY CARD</h2>
//             </center>
//             <center>
//               {" "}
//               <Link
//                 to ="/allpayment"
                
//               >{" "}
         

//               </Link>
                
//             </center>
//             <div class="card-group">
//               {filteredPaymentList.map((payments, index) => (
//                 <div
//                   key={index}
//                   class="card text-center"
//                   style={{ width: "18rem" }}
//                 >
//                   <div class="card-body">
//                     <h5 class="card-title">CARD {index + 1}</h5>
//                     <p>{payments.Cholder}</p>
//                     <p>{payments.Cnumber}</p>
//                     <p>{payments.date}</p>
//                     <p>{payments.cvv}</p>
//                     <a className="btn btn-warning" href={"update-payment/" + payments._id} style={{textDecoration:" none"}}>
//     <i class="fas fa-edit" style={{fontFamily: "Lucida Bright", fontSize: "18px"}}>&nbsp; Edit</i>
// </a>
        
//                     <br />
//                     <Link
//                       to ="view-payment/"
//                       onClick={() => deletePayment(payments._id)}
//                       class="btn btn-danger mt-1"
//                     >
//                       Remove
//                     </Link>
//                     <br />
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Mycards;

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
//import NavBar from "./NavBar";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import { Document, Page, Text, View, StyleSheet, PDFDownloadLink } from '@react-pdf/renderer';

function Mycards() {
  const [column, setColumns] = useState([]);
  const [payments, setPayment] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  async function deletePayment(id) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this payment?"
    );
    if (confirmed) {
      try {
        const response = await axios.delete(
          `http://localhost:8070/ipayments/delete/${id}`
        );
        alert("Payment successfully deleted.");
        window.location = "/view-payment";
      } catch (err) {
        console.error(err);
        alert("An error occurred while deleting the payment.");
      }
    } else {
      window.location = "/view-payment";
    }
  }



  useEffect(() => {
    function getPayment() {
      axios
        .get("http://localhost:8070/ipayments/")
        .then((res) => {
          const filteredPayments = res.data.filter((payment) =>
                payment.Cholder.toLowerCase().includes(searchQuery.toLowerCase()) ||
                payment.date.toLowerCase().includes(searchQuery.toLowerCase()) ||
                payment.cvv.toLowerCase().includes(searchQuery.toLowerCase()) ||
                (typeof payment.Cnumber === 'string' && payment.phonenumber.toLowerCase().includes(searchQuery.toLowerCase())) 
                

              );
              setPayment(filteredPayments);
        })
        .catch((err) => {
          alert(err.message);
        });
    }
    getPayment();
  }, [[searchQuery]]);

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  }

  const filteredPaymentList = payments.filter((payment) => {
    return (
      payment.Cholder.toLowerCase().includes(searchQuery.toLowerCase()) ||
      payment.date.toLowerCase().includes(searchQuery.toLowerCase()) ||
      payment.cvv.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (typeof payment.Cnumber === 'string' && payment.phonenumber.toLowerCase().includes(searchQuery.toLowerCase()))
    )
  })

  const styles = StyleSheet.create({
    page: {
        backgroundColor: '#ffffff',
        padding: 20
    },
    section: {
        margin: 10,
        padding: 10,
        flexGrow: 1
    },
    tableHeader: {
        backgroundColor: '#f2f2f2'
    },
    tableRow: {
        flexDirection: 'row'
    },
    tableCell: {
        padding: 5
    }
  });


  // pdf

  const PaymentDocument = () => (
    <Document>
        <Page size="A3" style={styles.page}>
            <View style={styles.section}>
                <Text style={{ fontSize: 10, marginBottom: 10 }}>Payment List</Text>
                <View style={[styles.tableRow, styles.tableHeader]}>
                    <Text style={[styles.tableCell, { flex: 1 }]}>ID</Text>
                    <Text style={[styles.tableCell, { flex: 4 }]}>Cholder Name</Text>
                    <Text style={[styles.tableCell, { flex: 20 }]}>Cnumber Count</Text>
                    <Text style={[styles.tableCell, { flex: 4 }]}>Date</Text>
                    <Text style={[styles.tableCell, { flex: 4 }]}>cvv</Text>           
                
                </View>
                {payments.map((item,index) => (
                    <View key={index} style={[styles.tableRow, { borderBottom: '1 solid #ccc' }]}>
                        <Text style={[styles.tableCell, { flex: 1 }]}>{index+1}</Text>
                        <Text style={[styles.tableCell, { flex: 4 }]}>{item.Cholder}</Text>
                        <Text style={[styles.tableCell, { flex: 20 }]}>{item.Cnumber}</Text>
                        <Text style={[styles.tableCell, { flex: 4 }]}>{item.date}</Text>
                        <Text style={[styles.tableCell, { flex: 4 }]}>{item.cvv}</Text>
                    </View>
                ))}
            </View>
        </Page>
    </Document>
  );

  return (
    <div>
      {/* Search bar */}
      <div className="row bg-primary">
        <div className="search-container">
          <input 
            type="text" 
            placeholder="Search..." 
            onChange={handleSearch} 
            style={{
              borderRadius: "10px",
              border: 0,
              paddingLeft: "15px",
              marginTop: "20px",
              alignItems: "center",
              marginBottom: "30px",
              width: "20%",
              marginLeft: "50px",
              boxShadow: "3px 3px 3px rgba(150, 168, 156)",
              backgroundColor: "#f9f9f9",
            }}
          />
        </div>
         
        <button className="btn btn-success" style={{ margin: '0 0'}}>
          <PDFDownloadLink 
            style={{ margin: '0 0', textDecoration: 'none', color: '#f9f9f9'}} 
            document={<PaymentDocument />} 
            fileName="Payment-document.pdf"
          >
            {({ blob, url, loading, error }) =>
              loading ? 'Loading document...' : 'Download Payment report now!'
            }
          </PDFDownloadLink>
        </button>
      </div>
        
      {/* Information section */}
      <div>
        <Container className="my-5" style={{ width: "70%" }}>
          <Row className="align-items-center">
            <Col md={12}>
              <h2 className="mb-3">
                Save your credit card information for upcoming purchases!
              </h2>
              <p style={{ fontSize: "17px" }}>
                It's important to note that we take the security of your
                personal and financial information very seriously. Our website
                uses industry-standard encryption technology to protect your
                data and ensure that it is kept confidential. Additionally, we
                never store your full card number on our servers - instead, we use
                a secure tokenization process to encrypt and store your card
                details.
                We take the security of your personal and financial information very seriously, it is vital to emphasize. In order
                to safeguard your information and preserve its confidentiality, our website employs industry-standard 
                encryption technology. Additionally, we never save your complete card number on our systems; instead, we encrypt
                and store your card information using a safe tokenization technique.
              </p>
              <p style={{ fontSize: "17px" }}>
                If you have any concerns or questions about our payment security
                measures or how to save your card details, please don't hesitate
                to contact us via phone or email. Our customer support team is
                available 24/7 to assist you and address any issues you may
                encounter.
              </p>
            </Col>
          </Row>
        </Container>
      </div>
        
      {/* Add Payment button section */}
      <div className="container" style={{ marginBottom: "50px" }}>
        <div className="container">
          <div className="text-center">
            <a className="btn btn-primary" href={"/add-payment/"} style={{textDecoration: "none"}}>
              <i className="fas fa-edit">&nbsp; Add Payment +</i>
            </a> 
          </div>
        </div>
         
        {/* Payment cards section */}
        <div className="row">
          <div className="col-12"> 
            <center>
              <h1>Payment Details</h1>
            </center>
            <center>
              <h2>MY CARD</h2>
            </center>
            <center>
              <Link to="/allpayment"></Link>
            </center>
            <div className="card-group">
              {filteredPaymentList.map((payments, index) => (
                <div
                  key={index}
                  className="card text-center"
                  style={{ width: "18rem" }}
                >
                  <div className="card-body">
                    <h5 className="card-title">CARD {index + 1}</h5>
                    <p>{payments.Cholder}</p>
                    <p>{payments.Cnumber}</p>
                    <p>{payments.date}</p>
                    <p>{payments.cvv}</p>
                    <a className="btn btn-warning" href={"update-payment/" + payments._id} style={{textDecoration: "none"}}>
                      <i className="fas fa-edit" style={{fontFamily: "Lucida Bright", fontSize: "18px"}}>&nbsp; Edit</i>
                    </a>
          
                    <br />
                    <Link
                      to="view-payment/"
                      onClick={() => deletePayment(payments._id)}
                      className="btn btn-danger mt-1"
                    >
                      Remove
                    </Link>
                    <br />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
  
      {/* Original Footer */}
      <footer
        className="py-3"
        style={{
          backgroundColor: "#eef4ed",
          borderTop: "1px solid #ccc",
        }}
      >
        <div className="container">
          <div className="row">
            <div className="col-md-6 text-md-start text-center">
              <p className="mb-1 fw-bold">HCMS © {new Date().getFullYear()}</p>
              <p className="mb-0">Healthcare Management System</p>
            </div>
            <div className="col-md-6 text-md-end text-center">
              <p className="mb-1">📍 123 Main Street, Colombo, Sri Lanka</p>
              <p className="mb-0">
                📞 ‪+94 11 2345678‬ | ✉ <a href="mailto:info@hcms.lk">info@hcms.lk</a>
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Mycards;
