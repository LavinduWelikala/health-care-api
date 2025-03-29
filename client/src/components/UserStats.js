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
    const doc = new jsPDF("landscape", "px", "a4", "false");
    doc.text(180, 30, "Statistics of User Enrollment with the HCMS system");
    doc.addImage(imgData, "PNG", 160, 100, 300, 200);
    doc.save("stat.pdf");
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
      <div style={{ width: "70%", margin: "50px auto" }}>
        <canvas ref={canvasRef} />
        <div className="text-center" style={{ marginTop: "50px" }}>
          <Button onClick={pdfGenerate}>Download pdf</Button>
        </div>
      </div>
    </div>
  );
};

export default UserStats;
