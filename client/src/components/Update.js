// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useParams } from "react-router-dom";
// import NavBar from "./NavBar";

// const Update = () => {
//   const { id } = useParams();
//   const [data, setData] = useState([]);

//   useEffect(() => {
//     axios
//       .get(`http://localhost:8070/ipayments/get/${id}`)
//       .then((response) => setData(response.data))
//       .catch((error) => console.log(error));
//   }, [id]);

//   const handleInputChange = (event) => {
//     const { name, value } = event.target;
//     setData((prevData) => ({ ...prevData, [name]: value }));
//   };

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     axios
//       .put(`http://localhost:8070/ipayments/update/${id}`, data)
//       .then(() => (window.location = "/view-payment"))
//       .catch((error) => console.log(error));
//   };

//   return (
//     <div>
//       <NavBar />
//       <div
//         className="container"
//         style={{
//           width: "40%",
//           boxShadow: "0 2px 4px rgba(0, 0, 0, 0.6)",
//           borderRadius: "20px",
//           padding: "30px",
//         }}
//       >
//         <form onSubmit={handleSubmit}>
//           <div class="mb-3">
//             <center>
//               <h2>Edit Card details</h2>
//             </center>

//             <label for="Cholder" class="form-label">
//               Card Holder Name
//             </label>
//             <input
//               type="text"
//               required
//               class="form-control"
//               id="name"
//               name="Cholder"
//               value={data.Cholder}
//               placeholder="Enter Card Holder"
//               onChange={handleInputChange}
//             />
//           </div>

//           <div class="mb-3">
//             <label for="CardNumber" class="form-label">
//               Card Number
//             </label>
//             <input
//               type="text"
//               required
//               name="Cnumber"
//               class="form-control"
//               id="name"
//               value={data.Cnumber || ""}
//               placeholder="Enter Card number"
//               onChange={handleInputChange}
//             />
//           </div>

//           <div class="mb-3">
//             <label for="cvv Number" class="form-label">
//               cvv Number
//             </label>
//             <input
//               type="number"
//               required
//               name="cvv"
//               class="form-control"
//               id="name"
//               value={data.cvv || ""}
//               placeholder="Enter cvv"
//               onChange={handleInputChange}
//             />
//           </div>
//           <button type="submit" class="btn btn-danger">
//             Edit
//           </button>
//         </form>
//       </div>
//       {/* <div>
//          <center> <label htmlFor="date">date:</label></center>
//          <center> <input type="Date" name="date" value={data.Date || ''} placeholder="Enter Your Expire date"onChange={handleInputChange} /></center>
//         </div> */}
//     </div>
//   );
// };

// export default Update;


import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import NavBar from "./NavBar";

const Update = () => {
  const { id } = useParams();
  console.log("ID:", id);
  
  // State for the form data with card sections
  const [formData, setFormData] = useState({
    Cholder: '',
    cardSection1: '',
    cardSection2: '',
    cardSection3: '',
    cardSection4: '',
    cvv: ''
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  
  // Create refs for each input field to focus them programmatically
  const section1Ref = useRef(null);
  const section2Ref = useRef(null);
  const section3Ref = useRef(null);
  const section4Ref = useRef(null);

  useEffect(() => {
    // Fetch card data
    axios
      .get(`http://localhost:8070/ipayments/get/${id}`)
      .then((response) => {
        console.log("API Response:", response.data);
        
        // Check if response data exists
        if (response.data && response.data.card) {
          const cardData = response.data.card;
          
          console.log("Card Data used:", cardData);
          
          // If cardSections are provided in the response, use them
          if (cardData._doc && cardData._doc.cardSections) {
            const sections = cardData._doc.cardSections;
            
            setFormData({
              Cholder: cardData.Cholder || '',
              cardSection1: sections.section1 || '',
              cardSection2: sections.section2 || '',
              cardSection3: sections.section3 || '',
              cardSection4: sections.section4 || '',
              cvv: cardData.cvv || ''
            });
          } else {
            // Otherwise split the card number manually
            const cardNumberStr = cardData.Cnumber ? 
              cardData.Cnumber.toString().padStart(16, '0') : 
              '0000000000000000';
            
            setFormData({
              Cholder: cardData.Cholder || '',
              cardSection1: cardNumberStr.substring(0, 4),
              cardSection2: cardNumberStr.substring(4, 8),
              cardSection3: cardNumberStr.substring(8, 12),
              cardSection4: cardNumberStr.substring(12, 16),
              cvv: cardData.cvv || ''
            });
          }
        }
        setLoading(false);
      })
      .catch((error) => {
        console.log("API Error:", error);
        setError("Failed to load card data. Please try again later.");
        setLoading(false);
      });
  }, [id]);

  // Handle input changes and automatically move focus to the next input for card sections
  const handleCardSectionChange = (e, section, nextRef) => {
    const value = e.target.value;
    
    // Only allow numeric input
    if (value === "" || /^[0-9]+$/.test(value)) {
      // Update the state variable corresponding to this section
      setFormData(prevData => ({
        ...prevData,
        [`cardSection${section}`]: value
      }));
      
      // Move to next input field if this one is full
      if (value.length === 4 && nextRef) {
        nextRef.current.focus();
      }
    }
  };

  // Handle backspace to move to previous input when empty
  const handleKeyDown = (e, section, prevRef) => {
    // If backspace is pressed and the field is empty, focus on the previous field
    if (e.key === "Backspace" && e.target.value === "" && prevRef) {
      prevRef.current.focus();
    }
  };

  // Handle other input changes
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setError(null);
    setSuccess(false);
    
    // Validate form data
    if (!formData.Cholder.trim()) {
      setError("Card holder name is required");
      return;
    }

    if (!formData.cardSection1 || !formData.cardSection2 || 
        !formData.cardSection3 || !formData.cardSection4 ||
        formData.cardSection1.length !== 4 || formData.cardSection2.length !== 4 ||
        formData.cardSection3.length !== 4 || formData.cardSection4.length !== 4) {
      setError("Please enter a valid 16-digit card number");
      return;
    }

    if (!formData.cvv || formData.cvv.length !== 3) {
      setError("Please enter a valid 3-digit CVV");
      return;
    }
    
    // Combine card sections into one string for submission
    // We're sending the card number as a string to prevent any issues with large integers
    const cardNumber = 
      formData.cardSection1 + 
      formData.cardSection2 + 
      formData.cardSection3 + 
      formData.cardSection4;
    
    // Format the submission data as expected by the backend
    const submissionData = {
      Cholder: formData.Cholder,
      Cnumber: cardNumber,  // Send as string
      cvv: formData.cvv
    };

    console.log("Submitting data:", submissionData);

    // Make the API request
    axios
      .put(`http://localhost:8070/ipayments/update/${id}`, submissionData)
      .then((response) => {
        console.log("Update response:", response.data);
        setSuccess(true);
        // Redirect after a short delay to show success message
        setTimeout(() => {
          window.location = "/view-payment";
        }, 1500);
      })
      .catch((error) => {
        console.log("Update error:", error);
        
        // Better error handling with user feedback
        if (error.response) {
          // The request was made and the server responded with an error status
          const errorMsg = error.response.data && error.response.data.message 
            ? error.response.data.message 
            : `Server error: ${error.response.status}`;
          
          setError(errorMsg);
        } else if (error.request) {
          // The request was made but no response was received
          setError("No response from server. Please check your connection.");
        } else {
          // Something happened in setting up the request
          setError(`Error: ${error.message}`);
        }
      });
  };

  if (loading) {
    return (
      <div>
        <NavBar />
        <div className="container mt-5 text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-2">Loading card details...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <NavBar />
      <div
        className="container"
        style={{
          width: "40%",
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.6)",
          borderRadius: "20px",
          padding: "30px",
          marginTop: "30px"
        }}
      >
        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}
        
        {success && (
          <div className="alert alert-success" role="alert">
            Card updated successfully! Redirecting...
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <center>
              <h2>Edit Card Details</h2>
            </center>

            <label htmlFor="Cholder" className="form-label">
              Card Holder Name
            </label>
            <input
              type="text"
              required
              className="form-control"
              name="Cholder"
              value={formData.Cholder}
              placeholder="Enter Card Holder"
              onChange={handleInputChange}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="CardNumber" className="form-label">
              Card Number
            </label>
            <div className="d-flex">
              <input
                type="text"
                required
                className="form-control me-2"
                maxLength="4"
                value={formData.cardSection1}
                placeholder="XXXX"
                onChange={(e) => handleCardSectionChange(e, 1, section2Ref)}
                ref={section1Ref}
              />
              <input
                type="text"
                required
                className="form-control me-2"
                maxLength="4"
                value={formData.cardSection2}
                placeholder="XXXX"
                onChange={(e) => handleCardSectionChange(e, 2, section3Ref)}
                onKeyDown={(e) => handleKeyDown(e, 2, section1Ref)}
                ref={section2Ref}
              />
              <input
                type="text"
                required
                className="form-control me-2"
                maxLength="4"
                value={formData.cardSection3}
                placeholder="XXXX"
                onChange={(e) => handleCardSectionChange(e, 3, section4Ref)}
                onKeyDown={(e) => handleKeyDown(e, 3, section2Ref)}
                ref={section3Ref}
              />
              <input
                type="text"
                required
                className="form-control"
                maxLength="4"
                value={formData.cardSection4}
                placeholder="XXXX"
                onChange={(e) => handleCardSectionChange(e, 4, null)}
                onKeyDown={(e) => handleKeyDown(e, 4, section3Ref)}
                ref={section4Ref}
              />
            </div>
          </div>

          <div className="mb-3">
            <label htmlFor="cvv" className="form-label">
              CVV Number
            </label>
            <input
              type="text"
              required
              name="cvv"
              className="form-control"
              maxLength="3"
              value={formData.cvv}
              placeholder="Enter CVV"
              onChange={(e) => {
                // Only allow numeric input for CVV
                if (e.target.value === "" || /^[0-9]+$/.test(e.target.value)) {
                  handleInputChange(e);
                }
              }}
            />
          </div>
          <button type="submit" className="btn btn-danger">
            Update Card
          </button>
        </form>
      </div>
    </div>
  );
};

export default Update;