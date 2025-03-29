import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/ManageInvoice.css';
import SideNav from "./SideNav.js"
import { CSVLink } from 'react-csv';

export default function ManageInvoice() {
  const [invoices, setInvoices] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingInvoice, setEditingInvoice] = useState(null);

  useEffect(() => {
    function getInvoices() {
      axios.get('http://localhost:8070/invoice/')
        .then(res => {
          setInvoices(res.data);
        })
        .catch(err => {
          alert(err.message);
        });
    }

    getInvoices();
  }, []);

  const filteredInvoices = invoices.filter(invoice =>
    invoice.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    new Date(invoice.date).toLocaleDateString().includes(searchTerm)
  );

  const handleEdit = invoice => {
    setEditingInvoice(invoice);
  };

  const handleDelete = invoice => {
    axios.delete(`http://localhost:8070/invoice/delete/${invoice._id}`)
      .then(res => {
        alert(res.data.status);
        setInvoices(invoices.filter(i => i._id !== invoice._id));
      })
      .catch(err => {
        alert(err.message);
      });
  };
  

  const handleUpdate = () => {
    axios.put(`http://localhost:8070/invoice/update/${editingInvoice._id}`, editingInvoice)
      .then(res => {
        alert(res.data.status);
        setEditingInvoice(null);
        setInvoices(invoices.map(invoice => {
          if (invoice._id === editingInvoice._id) {
            return editingInvoice;
          } else {
            return invoice;
          }
        }));
      })
      .catch(err => {
        alert(err.message);
      });
  };

  const handleCancelEdit = () => {
    setEditingInvoice(null);
  };

  const handleChange = (e, field) => {
    const value = e.target.value;
    setEditingInvoice(prevState => ({
      ...prevState,
      [field]: value
    }));
  };

  const csvData = filteredInvoices.map(invoice => ({
    'Invoice Number': invoice.invoiceNumber,
    'Patient Name': invoice.patientName,
    'Date': new Date(invoice.date).toLocaleDateString(),
    'Total Amount(Rs.)': invoice.total
  }));
  
  

  return (
    <>
    <SideNav/>
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: "70px", marginLeft: "220px" }}>
      <h1 style={{ textAlign: 'center' }}>Manage Invoices</h1>
      <div style={{ margin: '20px 0px' }}>
        <label htmlFor="search">Search:</label>
        <input type="text" id="search" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} placeholder=" Ex:- Patient Name" />

      </div>
      <table style={{ margin: '0 auto' }} className='table-mi'>
        <thead>
          <tr>
            <th>Invoice Number</th>
            <th>Patient Name</th>
            <th>Date</th>
            <th>Total Amount(Rs.)</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredInvoices.map(invoice => (
            <tr key={invoice._id}>
              <td>
              {editingInvoice?._id === invoice._id ? (
                  <input type="text" value={editingInvoice.invoiceNumber} onChange={e => handleChange(e, 'invoiceNumber')} />
                ) : (
                  invoice.invoiceNumber
                )}
                
               </td>
              <td>
                {editingInvoice?._id === invoice._id ? (
                  <input type="text" value={editingInvoice.patientName} onChange={e => handleChange(e, 'patientName')} />
                ) : (
                  invoice.patientName
                )}
              </td>
              <td>
                {editingInvoice?._id === invoice._id ? (
                  <input type="date" value={editingInvoice.date} onChange={e => handleChange(e, 'date')} />
                ) : (
                  new Date(invoice.date).toLocaleDateString()
                )}
              </td>
              <td>
                {editingInvoice?._id === invoice._id ? (
                  <input type="number" value={editingInvoice.totalAmount} onChange={e => handleChange(e, 'totalAmount')} />
                      ) : (
                    invoice.total
                           )}
                        </td>
                          <td>
                    {editingInvoice?._id === invoice._id ? (
                 <>
                   < button onClick={handleUpdate}>Save</button>
                      <button onClick={handleCancelEdit}>Cancel</button>
                  </>
               ) : (
             <>
               <button onClick={() => handleEdit(invoice)}>Edit</button>
              <button onClick={() => handleDelete(invoice)}>Delete</button>
               </>
                )}
             </td>
                 </tr>
                 ))}
                   </tbody>
                   </table>
                   <CSVLink data={csvData} filename={'invoices.csv'} className='btn btn-primary' target='_blank' style={{ marginTop: '20px' }}>Generate Report</CSVLink>
                   
                    </div>
                    
    </>
                      );
                        }

