import React, { useEffect, useState } from "react";
import AddPrescription from "./AddPrescription";
import UpdatePrescription from "./UpdatePrescription";

function Report() {
  const email = localStorage.getItem("userEmail");
  const [reportData, setReportData] = useState([]);
  const [id, setID] = useState("");
  const [closeModal, setCloseModal] = useState(false);
  const [show, setShow] = useState(false);

  useEffect(() => {
    async function fetchReportData(id) {
      const response = await fetch(
        `http://localhost:8070/report/get-reports/${id}`,
        {
          method: "GET",
        }
      );

      const data = await response.json();
      // console.log(data);
      if (data) {
        setReportData(data.report);
      }
    }

    fetchReportData(email);
  }, [email]);

  function deletePrescription(id) {
    async function updateDetails(id) {
      const response = await fetch(
        `http://localhost:8070/report/delete/prescription/${id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id: id,
          }),
        }
      );

      const data = await response.json();

      if (data.status === "Prescription Deleted") {
        alert("Prescription Deleted");
        window.location.reload(false);
      }
    }

    updateDetails(id);
  }

  return (
    <div>
      <h2 style={{ marginTop: "30px", marginBottom: "100px" }}>
        Patient Reports
      </h2>
      <div>
        <table
          class="table"
          style={{ width: "70%", margin: "auto", textAlign: "center" }}
        >
          <thead>
            <tr>
              <th scope="col">Report ID</th>
              <th scope="col">Patient Name</th>
              <th scope="col">Patient Age</th>
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
                  <td>{report.patientName}</td>
                  <td>{report.patientAge}</td>
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
                  {report.status === "Pending" && (
                    <td>
                      <button
                        className="btn btn-danger"
                        onClick={() => {
                          setID(report.id);
                          setCloseModal(true);
                        }}
                      >
                        Add
                      </button>
                    </td>
                  )}
                  {report.status === "Reviewed" && (
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
                  <td>
                    {report.prescriptionURL !== "" && (
                      <button
                        type="button"
                        className="btn btn-danger"
                        onClick={() => deletePrescription(report._id)}
                      >
                        Delete
                      </button>
                    )}
                  </td>
                  {report.prescriptionURL === "" && <td></td>}
                  <td>
                    {report.prescriptionURL !== "" && (
                      <button
                        type="button"
                        className="btn btn-danger"
                        onClick={() => {
                          setID(report.id);
                          setShow(true);
                        }}
                      >
                        Update
                      </button>
                    )}
                  </td>
                  {report.prescriptionURL === "" && <td></td>}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {closeModal && (
        <AddPrescription closeModal={setCloseModal} details={id} />
      )}
      {show && <UpdatePrescription closeModal={setShow} details={id} />}
    </div>
  );
}

export default Report;
