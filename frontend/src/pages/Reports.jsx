import { useState } from "react";
import axios from "../api/axios";
import Navbar from "../components/Navbar";
import { getErrorMessage } from "../utils/errorHandler";
import { showSuccess } from "../utils/successHandler";
import reportService from "../services/reportService";
import Loader from "../components/Loader";
import EmptyState from "../components/EmptyState";
import SkeletonLoader from "../components/SkeletonLoader";

function Reports() {
  const [eventId, setEventId] =
    useState("");

  const [report, setReport] =
    useState([]);

  const [loading, setLoading] = useState(false);

  const fetchRegistrations =
    async () => {
      if (!eventId.trim()) {
  alert("Please enter an Event ID.");
  return;
}
      try {
        setLoading(true);
        const token =
          localStorage.getItem(
            "token"
          );

        const res =
          await reportService.getRegistrations(eventId, token);

        setReport(
          res.data
        );

      } catch (error) {
        alert(getErrorMessage(error));
        } finally {

    setLoading(false);

  }
    };

    const downloadCSV =
  async () => {
    if (!eventId.trim()) {
  alert("Please enter an Event ID.");
  return;
}
    try {
        setLoading(true);
      const token =
        localStorage.getItem(
          "token"
        );

      const response =
        await reportService.downloadCSV(eventId, token);

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
      showSuccess("CSV Download Started");

    } catch (error) {
      alert(getErrorMessage(error));
    }finally{

setLoading(false);

}
  
  if (loading)
  return <SkeletonLoader count={4} />;};

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

      <button disabled={loading}
        onClick={
          fetchRegistrations
        }
      >{loading ? "Loading..." : "Load Report"}
      </button>

      <button disabled={loading}
        onClick={
          downloadCSV
        }
      >{loading ? "Downloading..." : "Download CSV"}
      </button>

      <hr />

      {report.length === 0 ? (

<h3>No Report Loaded</h3>

) : (

report.map((r) => (
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
      )) )}
    </>
  );
}

export default Reports;