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
      // console.log(data);
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
    <div>
      <div>
        <table
          class="table"
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
          <tbody class="table-group-divider">
            {reportData.map((report, index) => {
              return (
                <tr>
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
    </div>
  );
}

export default MedicalProfile;
