import { useState } from "react";
import axios from "../api/axios";
import Navbar from "../components/Navbar";

function Reports() {
  const [eventId, setEventId] =
    useState("");

  const [report, setReport] =
    useState([]);

  const fetchRegistrations =
    async () => {
      try {

        const token =
          localStorage.getItem(
            "token"
          );

        const res =
          await axios.get(
            `/reports/registrations/${eventId}`,
            {
              headers: {
                Authorization:
                  `Bearer ${token}`,
              },
            }
          );

        setReport(
          res.data
        );

      } catch (error) {
        console.log(error);
      }
    };

    const downloadCSV =
  async () => {
    try {

      const token =
        localStorage.getItem(
          "token"
        );

      const response =
        await axios.get(
          `/reports/registrations-csv/${eventId}`,
          {
            headers: {
              Authorization:
                `Bearer ${token}`,
            },

            responseType:
              "blob",
          }
        );

      const url =
        window.URL.createObjectURL(
          new Blob([
            response.data,
          ])
        );

      const link =
        document.createElement(
          "a"
        );

      link.href = url;

      link.setAttribute(
        "download",
        "registrations.csv"
      );

      document.body.appendChild(
        link
      );

      link.click();

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Navbar />

      <h1>
        Reports
      </h1>

      <input
        placeholder="Event ID"
        value={eventId}
        onChange={(e) =>
          setEventId(
            e.target.value
          )
        }
      />

      <button
        onClick={
          fetchRegistrations
        }
      >
        Load Report
      </button>

      <button
  onClick={
    downloadCSV
  }
>
  Download CSV
</button>

      <hr />

      {report.map((r) => (
        <div
          key={r._id}
        >
          <p>
            {
              r.userId?.name
            }
          </p>

          <p>
            {
              r.userId?.email
            }
          </p>

          <hr />
        </div>
      ))}
    </>
  );
}

export default Reports;