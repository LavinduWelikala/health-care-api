import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/ManagePatient.css';
import SideNav from "./SideNav.js"
import { CSVLink } from 'react-csv';


export default function ManagePatient() {
  const [patients, setPatients] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [filteredPatients, setFilteredPatients] = useState([]);
  const [editingPatient, setEditingPatient] = useState(null);

  useEffect(() => {
    function getPatients() {
      axios.get("http://localhost:8070/pharmacist/")
        .then((res) => {
          setPatients(res.data);
        })
        .catch((err) => {
          alert(err.message);
        });
    }

    getPatients();
  }, []);

  useEffect(() => {
    const filteredPatients = patients.filter((patient) => {
      return (
        patient.name?.toLowerCase().includes(searchText.toLowerCase()) ||
        patient.contact?.toLowerCase().includes(searchText.toLowerCase()) ||
        patient.address?.toLowerCase().includes(searchText.toLowerCase()) ||
        patient.doctor?.toLowerCase().includes(searchText.toLowerCase()) ||
        patient.location?.toLowerCase().includes(searchText.toLowerCase())
      );
    });

    setFilteredPatients(filteredPatients);
  }, [searchText, patients]);

  const handleEdit = patient => {
    setEditingPatient(patient);
  };

  const handleDelete = patient => {
    axios.delete(`http://localhost:8070/pharmacist/delete/${patient._id}`)
      .then(res => {
        alert(res.data.status);
        setPatients(patients.filter(i => i._id !== patient._id));
      })
      .catch(err => {
        alert(err.message);
      });
  };

  const handleUpdate = () => {
    axios.put(`http://localhost:8070/pharmacist/update/${editingPatient._id}`, editingPatient)
      .then(res => {
        alert(res.data.status);
        setEditingPatient(null);
        setPatients(patients.map(patient => {
          if (patient._id === editingPatient._id) {
            return editingPatient;
          } else {
            return patient;
          }
        }));
      })
      .catch(err => {
        alert(err.message);
      });
  };

  const handleCancelEdit = () => {
    setEditingPatient(null);
  };

  const handleChange = (e, field) => {
    const value = e.target.value;
    setEditingPatient(prevState => ({
      ...prevState,
      [field]: value
    }));
  };

  const handleSearch = e => {
    setSearchText(e.target.value);
  };
  const csvData = filteredPatients.map(patient => ({
    Name: patient.name,
    Age: patient.age,
    Gender: patient.gender,
    Contact: patient.contact,
    Address: patient.address,
    Doctor: patient.doctor,
    Location: patient.location
    }));
  
 

  return (
    <><SideNav/>
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', marginTop: "30px", marginLeft: "220px"}}>
      <h1>Manage Patients</h1>
      <div className="search-container" style={{margin : "30px 0px"}}>
      <label htmlFor="search">Search:</label>
        <input type="text" placeholder="Ex:- Search Patient" value={searchText} onChange={handleSearch} />
      </div>
      <table className="patient-list-container">
        <thead>
          <tr>
            <th>Name</th>
           < th>Age</th>
           <th>Gender</th>
            <th>Contact</th>
            <th>Address</th>
            <th>Doctor</th>
            <th>Location</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredPatients.map(patient => (
            <tr key={patient._id}>
              {editingPatient && editingPatient._id === patient._id ? (
                <>
                  <td><input type="text" value={editingPatient.name} onChange={e => handleChange(e, "name")} /></td>
                  <td><input type="number" value={editingPatient.age} onChange={e => handleChange(e, "age")} /></td>
                  <td><input type="text" value={editingPatient.gender} onChange={e => handleChange(e, "gender")} /></td>
                  <td><input type="text" value={editingPatient.contact} onChange={e => handleChange(e, "contact")} /></td>
                   <td><input type="text" value={editingPatient.address} onChange={e => handleChange(e, "address")} /></td>
                    <td><input type="text" value={editingPatient.doctor} onChange={e => handleChange(e, "doctor")} /></td>
               <  td><input type="text" value={editingPatient.location} onChange={e => handleChange(e, "location")} /></td>
           <td>
<button onClick={handleUpdate}>Save</button>
<button onClick={handleCancelEdit}>Cancel</button>
</td>
</>
) : (
<>
<td>{patient.name}</td>
<td>{patient.age}</td>
<td>{patient.gender}</td>
<td>{patient.contact}</td>
<td>{patient.address}</td>
<td>{patient.doctor}</td>
<td>{patient.location}</td>
<td>
<button onClick={() => handleEdit(patient)}>Edit</button>
<button onClick={() => handleDelete(patient)}>Delete</button>
</td>
</>
)}
</tr>
))}
</tbody>
</table>
<CSVLink data={csvData} filename={'patients.csv'} className='btn btn-primary' target='_blank' style={{ marginTop: '20px' }}>Generate Report</CSVLink>

</div>
</>
);
}





