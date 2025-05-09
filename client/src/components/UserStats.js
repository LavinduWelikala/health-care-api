import React, { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";
import Button from "react-bootstrap/esm/Button";
import jsPDF from "jspdf";

const UserStats = () => {
  const canvasRef = useRef(null);
  const chartRef = useRef(null);
  const [data, setData] = useState([]);

  const pdfGenerate = () => {
    const canvas = canvasRef.current;
    const imgData = canvas.toDataURL("image/png");
    const doc = new jsPDF("landscape", "px", "a4", false);
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();

    // Title and date/time
    doc.text(180, 30, "Statistics of User Enrollment with the HCMS system");
    doc.setFontSize(10);
    doc.text(`Generated on:`, 300, 40, { align: "center" });
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 300, 50, { align: "center" });
    doc.text(`Time: ${new Date().toLocaleTimeString()}`, 300, 60, { align: "center" });

    // Chart image
    doc.addImage(imgData, "PNG", 160, 100, 300, 200);

    // Footer
    const footerHeight = 60;
    const footerY = pageHeight - footerHeight;

    // Background rectangle for footer (mimicking #eef4ed)
    doc.setFillColor(238, 244, 237); // RGB for #eef4ed
    doc.rect(0, footerY, pageWidth, footerHeight, "F");

    // Border-top (mimicking 1px solid #ccc)
    doc.setDrawColor(204, 204, 204); // RGB for #ccc
    doc.line(0, footerY, pageWidth, footerY);

    // Left footer content
    doc.setFontSize(9);
    doc.setTextColor(0, 0, 0);
    doc.setFont("helvetica", "bold");
    doc.text(`HCMS © ${new Date().getFullYear()} All Rights Reserved`, 20, footerY + 20);
    doc.setFont("helvetica", "normal");
    doc.text("Healthcare Management System", 20, footerY + 30);

    // Right footer content
    doc.text("123 Main Street, Colombo, Sri Lanka", pageWidth - 20, footerY + 20, { align: "right" });
    doc.text(
      "+94 11 2345678 | info@hcms.lk",
      pageWidth - 20,
      footerY + 30,
      { align: "right" }
    );

    doc.save("User Enrollment Statistic Report.pdf");
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("http://localhost:8070/user/all-details", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      const data = await response.json();

      setData(data.couunt);
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (chartRef.current) {
      chartRef.current.data.datasets[0].data = data;
      chartRef.current.update();
    } else {
      const ctx = canvasRef.current.getContext("2d");
      chartRef.current = new Chart(ctx, {
        type: "bar",
        data: {
          labels: [
            "Admin",
            "Doctor",
            "Pharmacist",
            "Support Agent",
            "Patients",
          ],
          datasets: [
            {
              label: "Number of user enrollment with the system based on role",
              data,
              backgroundColor: "#81c3d7",
              borderColor: "#0496ff",
              borderWidth: 1,
              barThickness: "flex",
            },
          ],
        },
      });
    }
  }, [data]);

  return (
    <div className="container">
      <h3 style={{ textAlign: "center" }}>
        Statistics of User Enrollment with the HCMS system
      </h3>
      <div style={{ textAlign: "center", fontSize: "0.9em", color: "#555" }}>
        <p>Generated on:</p>
        <p>Date: {new Date().toLocaleDateString()}</p>
        <p>Time: {new Date().toLocaleTimeString()}</p>
      </div>
      <div style={{ width: "70%", margin: "50px auto" }}>
        <canvas ref={canvasRef} />
        <div className="text-center" style={{ marginTop: "50px" }}>
          <Button onClick={pdfGenerate}>Download pdf</Button>
        </div>
      </div>
      <footer
        className="py-3 mt-auto"
        style={{
          backgroundColor: "#eef4ed",
          borderTop: "1px solid #ccc",
        }}
      >
        <div className="container">
          <div className="row">
            <div className="col-md-6 text-md-start text-center">
              <p className="mb-1 fw-bold">HCMS © {new Date().getFullYear()} All Right Reserved</p>
              <p className="mb-0">Healthcare Management System</p>
            </div>
            <div className="col-md-6 text-md-end text-center">
              <p className="mb-1">📍 123 Main Street, Colombo, Sri Lanka</p>
              <p className="mb-0">
                📞 +94 11 2345678 | ✉️{" "}
                <a href="mailto:info@hcms.lk">info@hcms.lk</a>
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default UserStats;