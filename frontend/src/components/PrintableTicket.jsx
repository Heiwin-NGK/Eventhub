import StatusBadge from "./StatusBadge";
import { formatDate } from "../utils/dateFormatter";
import "../styles/printableTicket.css";

function InfoRow({ label, value }) {
  return (
    <div className="info-row">
      <span className="info-label">{label}</span>
      <span className="info-value">{value || "-"}</span>
    </div>
  );
}

function PrintableTicket({ ticket }) {
  return (
    <div className="print-ticket">

      {/* ================= Header ================= */}

      <header className="ticket-header">

        <div className="header-left">

          <h1>🎟 EVENTHUB</h1>

          <p>Digital Event Ticket</p>

        </div>

        <div className="header-right">

          <h3>{ticket.ticketId}</h3>

          <p>Secure Entry Pass</p>

        </div>

      </header>

      {/* ================= Event ================= */}

      <section className="ticket-event">

        <div>

          <h2>{ticket.eventId?.title}</h2>

          <p>
            📍 {ticket.eventId?.venue}
          </p>

        </div>

        <StatusBadge
          status={ticket.registrationStatus}
        />

      </section>

      <div className="ticket-divider" />

      {/* ================= Information ================= */}

      <section className="ticket-content">

        {/* Left */}

        <div className="ticket-panel">

          <div className="panel">

            <h3>👤 Attendee</h3>

            <InfoRow
              label="Name"
              value={ticket.userId?.name}
            />

            <InfoRow
              label="Email"
              value={ticket.userId?.email}
            />

          </div>

          <div className="panel">

            <h3>📍 Event</h3>

            <InfoRow
              label="Venue"
              value={ticket.eventId?.venue}
            />

            <InfoRow
              label="Type"
              value={ticket.eventId?.eventType}
            />

            <InfoRow
              label="Start"
              value={formatDate(ticket.eventId?.startDate)}
            />

            <InfoRow
              label="End"
              value={formatDate(ticket.eventId?.endDate)}
            />

          </div>

        </div>

        {/* Right */}

        <div className="ticket-panel">

          <div className="panel">

            <h3>🎟 Ticket</h3>

            <InfoRow
              label="ID"
              value={ticket.ticketId}
            />

            <InfoRow
              label="Registered"
              value={formatDate(ticket.registrationDate)}
            />

            <InfoRow
              label="Issued"
              value={formatDate(ticket.issuedAt)}
            />

            <InfoRow
              label="Status"
              value={ticket.registrationStatus}
            />

          </div>

          <div className="panel">

            <h3>👨 Organizer</h3>

            <InfoRow
              label="Name"
              value={ticket.eventId?.organizerId?.name}
            />

            <InfoRow
              label="Email"
              value={ticket.eventId?.organizerId?.email}
            />

          </div>

        </div>

      </section>

      <div className="ticket-divider" />

      {/* ================= QR ================= */}

      <section className="ticket-qr-section">

        <p>

          Scan this QR code during event entry

        </p>

        <img
          src={ticket.qrCode}
          alt="QR Code"
          className="ticket-qr"
        />

        <small>

          This ticket is unique and cannot be transferred.

        </small>

      </section>

      {/* ================= Footer ================= */}

<div className="ticket-footer">

  <h3>
    ⭐ Generated Securely by EventHub ⭐
  </h3>

  <div className="ticket-security">

    <p>
      <strong>Ticket ID:</strong> {ticket.ticketId}
    </p>

    <p>
      <strong>Issued:</strong>{" "}
      {formatDate(ticket.issuedAt)}
    </p>

    <p>
      <strong>Registered:</strong>{" "}
      {formatDate(ticket.registrationDate)}
    </p>

    <p>
      <strong>Security Notice:</strong>{" "}
      Do not share this QR code or Ticket ID with others.
    </p>

  </div>

</div>

    </div>
  );
}

export default PrintableTicket;