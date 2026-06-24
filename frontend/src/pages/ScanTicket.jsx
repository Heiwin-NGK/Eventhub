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
  const [recentScans, setRecentScans] = useState([]);
  const [manualTicketId, setManualTicketId] = useState("");

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

setRecentScans((prev) => {
  const updated = [
    {
      ticketId: res.data.ticket.ticketId,
      attendee: res.data.ticket.userId.name,
      event: res.data.ticket.eventId.title,
      time: new Date().toLocaleTimeString("en-IN"),
      status: res.data.checkedIn
        ? "Already Checked In"
        : "Verified",
    },
    ...prev,
  ];
  return updated.slice(0, 5);
});
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
const handleManualVerify = async () => {
  if (!manualTicketId.trim()) {
    alert("Enter a Ticket ID");
    return;
  }

  try {
    setLoading(true);
    setVerification(null);
    setError("");

    const token = localStorage.getItem("token");

    const res = await ticketService.verifyTicket(
      manualTicketId.trim(),
      token
    );
setVerification(res.data);
setScannerEnabled(false);

setRecentScans((prev) => {
  const updated = [
    {
      ticketId: res.data.ticket.ticketId,
      attendee: res.data.ticket.userId.name,
      event: res.data.ticket.eventId.title,
      time: new Date().toLocaleTimeString("en-IN"),
      status: res.data.checkedIn
        ? "Already Checked In"
        : "Verified",
    },
    ...prev,
  ];
  return updated.slice(0, 5);
});
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
<div className="card">

  <h2>Manual Ticket Search</h2>

  <p>
    Unable to scan? Enter the Ticket ID below.
  </p>

  <input
    type="text"
    placeholder="Enter Ticket ID"
    value={manualTicketId}
    onChange={(e) =>
      setManualTicketId(e.target.value)
    }
  />

  <br />

<button
  onClick={handleManualVerify}
  style={{
    marginTop: "15px",
  }}
>
    Verify Ticket
  </button>

</div>

<h2
  style={{
    marginTop: "30px",
    marginBottom: "15px",
  }}
>
  Scan QR Code
</h2>
{scannerEnabled && (
  <QRScanner
    onScan={handleScan}
    onError={handleError}
  />
)}
{loading && (
<div className="card">
  <h2>⏳ Verifying Ticket...</h2>

  <p>
    Please wait while EventHub verifies the ticket.
  </p>
</div>
)}
{verification?.statistics && (
<div className="card">
  <h2>
    Live Event Statistics
  </h2>

  <div
    style={{
      display: "grid",
      gridTemplateColumns: "repeat(2,1fr)",
      gap: "20px",
      marginTop: "20px",
    }}
  >
    <div>
      <h3>Capacity</h3>
      <p>{verification.statistics.capacity}</p>
    </div>
    <div>
      <h3>Registered</h3>
      <p>{verification.statistics.registered}</p>
    </div>
    <div>
      <h3>Checked In</h3>
      <p>{verification.statistics.checkedIn}</p>
    </div>
    <div>
      <h3>Remaining</h3>
      <p>{verification.statistics.remaining}</p>
    </div>
    <div>
      <h3>Occupancy</h3>
      <p>{verification.statistics.occupancy}</p>
    </div>
  </div>
</div>
)}{verification && (
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
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "20px",
      }}
    >
      <div>
        <h2 style={{ margin: 0 }}>
          {verification.checkedIn
            ? "🟡 Already Checked In"
            : "🟢 Valid Ticket"}
        </h2>

        <p
          style={{
            color: "#666",
            marginTop: "8px",
          }}
        >
          {verification.ticket.eventId.title}
        </p>
      </div>

      <div
        style={{
          fontSize: "45px",
        }}
      >
        🎟
      </div>
    </div>

    <hr />

    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "20px",
        marginTop: "20px",
      }}
    >
      <div>
        <strong>Attendee</strong>

        <p>{verification.ticket.userId.name}</p>

        <strong>Email</strong>

        <p>{verification.ticket.userId.email}</p>

        <strong>Ticket ID</strong>

        <p>{verification.ticket.ticketId}</p>
      </div>

      <div>
        <strong>Venue</strong>

        <p>{verification.ticket.eventId.venue}</p>

        <strong>Status</strong>

        <p>
          {verification.checkedIn
            ? "Already Checked In"
            : "Ready for Check-In"}
        </p>

        <strong>Organizer</strong>

        <p>
          {verification.ticket.eventId.organizerId?.name}
        </p>
      </div>
    </div>

    {verification.checkedIn && (
      <>
        <hr />

        <p>
          <strong>Checked In At:</strong>{" "}
          {new Date(
            verification.checkedInAt
          ).toLocaleString("en-IN", {
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

    {!verification.checkedIn && (
      <button
        onClick={handleCheckIn}
      >
        ✅ Check In
      </button>
    )}

    {" "}

    <button
      onClick={() => {
        setTicketId("");
        setManualTicketId("");
        setVerification(null);
        setError("");
        setScannerEnabled(true);
      }}
    >
      Scan Again
    </button>
  </div>
)}
{recentScans.length > 0 && (
  <div className="card">
    <h2>Recent Scans</h2>
    <table
      style={{
        width: "100%",
        borderCollapse: "collapse",
      }}
    ><thead>
        <tr>
          <th align="left">Attendee</th>
          <th align="left">Event</th>
          <th align="left">Time</th>
          <th align="left">Status</th>
        </tr>
      </thead>
      <tbody>
        {recentScans.map((scan, index) => (
          <tr key={index}>
            <td>{scan.attendee}</td>
            <td>{scan.event}</td>
            <td>{scan.time}</td>
            <td>{scan.status}</td>
          </tr>
        ))}
      </tbody>
    </table>
    <button onClick={() => setRecentScans([])}>Clear History</button>
  </div>
)}

{error && (
  <div
    className="card"
    style={{
      borderLeft: "8px solid #dc2626",
    }}
  >
    <h2 style={{ marginBottom: "10px" }}>
  🔴 Invalid Ticket
    </h2>

    <p>{error}</p>

    <p
  style={{
    color: "#666",
    marginBottom: "20px",
  }}
>
  Please verify the Ticket ID or scan another QR code.
</p>

    <button
      onClick={() => {
        setError("");
        setManualTicketId("");
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