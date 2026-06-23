import { useState } from "react";
import Navbar from "../components/Navbar";
import QRScanner from "../components/QRScanner";
import ticketService from "../services/ticketService";

function ScanTicket() {
  const [ticketId, setTicketId] = useState("");
  const [error, setError] = useState("");
  const [verification, setVerification] = useState(null);
  const [loading, setLoading] = useState(false);
  const [scannerEnabled, setScannerEnabled] = useState(true);

const handleScan = async (value) => {
  try {
    setLoading(true);

    setTicketId(value);

    setError("");

    const token = localStorage.getItem("token");

    const res = await ticketService.verifyTicket(
      value,
      token
    );

    setVerification(res.data);
    setScannerEnabled(false);
  } catch (error) {

    setVerification(null);

    setError(
      error.response?.data?.message ||
      "Verification failed"
    );

  } finally {

    setLoading(false);

  }
};
const handleCheckIn = async () => {
  try {
    const token = localStorage.getItem("token");

    const res = await ticketService.checkInTicket(
      verification.ticket.ticketId,
      token
    );

    alert(res.data.message);

    const updated = await ticketService.verifyTicket(
      verification.ticket.ticketId,
      token
    );

    setVerification(updated.data);

  } catch (error) {
    alert(
      error.response?.data?.message ||
      "Check-in failed"
    );
  }
};
const handleError = (err) => {
  console.error(err);
  setVerification(null);
  setError("Unable to access camera.");
};

  return (
    <>
      <Navbar />

      <div className="container">

        <div className="card">
          <h1>Scan Ticket</h1>

          <p>
            Scan an attendee QR code to verify the ticket.
          </p>
        </div>

{scannerEnabled && (
  <QRScanner
    onScan={handleScan}
    onError={handleError}
  />
)}
{loading && (
  <div className="card">
    <h2>Verifying Ticket...</h2>
  </div>
)}

{verification && (
  <div
    className="card"
    style={{
      borderLeft: `8px solid ${
        verification.checkedIn
          ? "#f59e0b"
          : "#16a34a"
      }`,
    }}
  >
    <h2>
      {verification.checkedIn
        ? "🟡 Already Checked In"
        : "🟢 Valid Ticket"}
    </h2>

    <hr />

    <p>
      <strong>Ticket ID:</strong>{" "}
      {verification.ticket.ticketId}
    </p>

    <p>
      <strong>Attendee:</strong>{" "}
      {verification.ticket.userId.name}
    </p>

    <p>
      <strong>Email:</strong>{" "}
      {verification.ticket.userId.email}
    </p>

    <p>
      <strong>Event:</strong>{" "}
      {verification.ticket.eventId.title}
    </p>

    <p>
      <strong>Venue:</strong>{" "}
      {verification.ticket.eventId.venue}
    </p>

    <p>
      <strong>Status:</strong>{" "}
      {verification.checkedIn
        ? "Already Checked In"
        : "Ready for Check-In"}
    </p>
{!verification.checkedIn && (
  <button
    onClick={handleCheckIn}
    style={{ marginTop: "15px" }}
  >
    ✅ Check In
  </button>
)}
{verification.checkedIn && (
  <>
    <p>
      <strong>Checked In At:</strong>{" "}
      {new Date(verification.checkedInAt).toLocaleString("en-IN", {
  dateStyle: "medium",
  timeStyle: "short",
})}
    </p>

    <p>
      <strong>Checked In By:</strong>{" "}
      {verification.checkedInBy?.name}
    </p>
  </>
)}
    <button
      onClick={() => {
        setTicketId("");
        setVerification(null);
        setError("");
        setScannerEnabled(true);
      }}
    >
      Scan Again
    </button>
  </div>
)}

{error && (
  <div
    className="card"
    style={{
      borderLeft: "8px solid #dc2626",
    }}
  >
    <h2>🔴 Invalid Ticket</h2>

    <p>{error}</p>

    <button
      onClick={() => {
        setError("");
        setScannerEnabled(true);
      }}
    >
      Scan Again
    </button>
  </div>
)}

      </div>
    </>
  );
}

export default ScanTicket;