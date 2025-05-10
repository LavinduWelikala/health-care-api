import React, { useEffect, useState } from "react";
import UpdateReport from "../components/UpdateReport";

function MedicalProfile() {
  const email = localStorage.getItem("userEmail");
  const [reportData, setReportData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [details, setDetails] = useState({});

  useEffect(() => {
    async function fetchReportData(id) {
      const response = await fetch(`http://localhost:8070/report/get/${id}`, {
        method: "GET",
      });

      const data = await response.json();
      if (data) {
        setReportData(data.report);
      }
    }

    fetchReportData(email);
  }, [email]);

  async function deleteReport(id) {
    const response = await fetch(`http://localhost:8070/report/delete/${id}`, {
      method: "DELETE",
    });

    const data = await response.json();

    if (data.status === "Report deleted") {
      alert("Report deleted");
      window.location.reload(false);
    }
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <div style={{ flex: "1 0 auto", padding: "20px" }}>
        <table
          className="table"
          style={{ width: "70%", margin: "auto", textAlign: "center" }}
        >
          <thead>
            <tr>
              <th scope="col">Report ID</th>
              <th scope="col">Doctor Name</th>
              <th scope="col">Status</th>
              <th scope="col">Attachments</th>
              <th scope="col">Prescription</th>
              <th scope="col" colSpan={2}>
                Edit
              </th>
            </tr>
          </thead>
          <tbody className="table-group-divider">
            {reportData.map((report, index) => {
              return (
                <tr key={index}>
                  <th scope="row">{report.id}</th>
                  <td>{report.doctorName}</td>
                  <td>
                    <button
                      className="btn btn-success"
                      disabled
                      style={{ marginRight: "30px" }}
                    >
                      {report.status}
                    </button>
                  </td>
                  <td>
                    <button
                      className="btn btn-primary"
                      onClick={() => {
                        window.open(report.reportURL, "_blank");
                      }}
                    >
                      View Report
                    </button>
                  </td>
                  {report.prescriptionURL !== "" && (
                    <td>
                      <button
                        className="btn btn-primary"
                        onClick={() => {
                          window.open(report.prescriptionURL, "_blank");
                        }}
                      >
                        View Prescription
                      </button>
                    </td>
                  )}
                  {report.prescriptionURL !== "" && <td></td>}
                  <td>
                    {report.prescriptionURL === "" && (
                      <button
                        type="button"
                        className="btn btn-danger"
                        onClick={() => deleteReport(report._id)}
                      >
                        Delete
                      </button>
                    )}
                  </td>
                  {report.prescriptionURL !== "" && <td></td>}
                  <td>
                    {report.prescriptionURL === "" && (
                      <button
                        type="button"
                        className="btn btn-danger"
                        onClick={() => {
                          setShowModal(true);
                          setDetails(report);
                        }}
                      >
                        Update
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {showModal && (
          <UpdateReport closeModal={setShowModal} details={details} />
        )}
      </div>
      <footer
        style={{
          backgroundColor: "#f8f9fa",
          padding: "1rem 0",
          borderTop: "1px solid #dee2e6",
          flexShrink: 0,
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
                📞 +94 11 2345678 | ✉️ <a href="mailto:info@hcms.lk">info@hcms.lk</a>
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default MedicalProfile;