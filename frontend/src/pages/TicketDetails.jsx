import { useEffect, useState, useRef } from "react";
import { useParams,Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Loader from "../components/Loader";
import EmptyState from "../components/EmptyState";
import TicketInfo from "../components/TicketInfo";
import QRCodeCard from "../components/QRCodeCard";
import StatusBadge from "../components/StatusBadge";
import ticketService from "../services/ticketService";
import { ROUTES } from "../constants/routes";
import { formatDate } from "../utils/dateFormatter";
import { getErrorMessage } from "../utils/errorHandler";
import html2canvas from "html2canvas";
import PrintableTicket from "../components/PrintableTicket";
import TicketPreviewModal from "../components/TicketPreviewModal";

function TicketDetails() {

  const { id } = useParams();

  const [ticket,setTicket] = useState(null);
  const [loading,setLoading] = useState(true);
  const printableTicketRef = useRef(null);
  const [previewOpen, setPreviewOpen] = useState(false);

  useEffect(() => {
    fetchTicket();
  }, []);

  const fetchTicket = async () => {
    try {

      const token =
        localStorage.getItem("token");

      const res =
        await ticketService.getTicketById(
          id,
          token
        );

      setTicket(res.data);

    } catch (error) {

      alert(
        getErrorMessage(error)
      );

    } finally {

      setLoading(false);

    }
  };

const downloadTicket = async () => {
  if (!printableTicketRef.current) {
    return;
  }

  const canvas = await html2canvas(printableTicketRef.current, {
    scale: 2,
    backgroundColor: "#ffffff",
    useCORS: true,
  });

  const link = document.createElement("a");

  link.download = `${ticket.ticketId}.png`;

  link.href = canvas.toDataURL("image/png");

  link.click();
};
  if (loading)
    return <Loader />;

  if (!ticket)
    return (
      <EmptyState title="Ticket Not Found" />
    );

  return (
    <>
      <Navbar />

<div   className="container" >

        <div className="card">
          <h1>{ticket.ticketId}</h1>
<StatusBadge
    status={ticket.registrationStatus}
/>
        </div>


        <div className="card">

          <h2>
            Ticket Information
          </h2>

          <TicketInfo
            label="Ticket ID"
            value={ticket.ticketId}
          />

          <TicketInfo
            label="Issued"
            value={formatDate(ticket.issuedAt)}
          />

<TicketInfo
    label="Registered"
    value={formatDate(ticket.registrationDate)}
/>

<TicketInfo
    label="Status"
    value={ticket.registrationStatus}
/>

        </div>

        <div className="card">

          <h2>
            Event Information
          </h2>

          <TicketInfo
            label="Title"
            value={ticket.eventId?.title}
          />

          <TicketInfo
            label="Venue"
            value={ticket.eventId?.venue}
          />

<TicketInfo
    label="Type"
    value={ticket.eventId?.eventType}
/>

<TicketInfo
    label="Capacity"
    value={ticket.eventId?.capacity}
/>

          <TicketInfo
            label="Start"
            value={formatDate(ticket.eventId?.startDate)}
          />

          <TicketInfo
            label="End"
            value={formatDate(ticket.eventId?.endDate)}
          />

<TicketInfo
    label="Organizer"
    value={ticket.eventId?.organizerId?.name}
/>
        
<TicketInfo
    label="Organizer Email"
    value={ticket.eventId?.organizerId?.email}
/>
        <QRCodeCard
          qrCode={ticket.qrCode}
        />

        </div>
<div className="card">

<button
  onClick={() => setPreviewOpen(true)}
>
  Preview Ticket
</button>

{" "}

<button
  onClick={() => {
    navigator.clipboard.writeText(ticket.ticketId);
    alert("Ticket ID copied");
  }}
>
  Copy Ticket ID
</button>

{" "}

<Link
  className="button-link"
  to={ROUTES.TICKETS}
>
  ← Back
</Link>

</div>
<div
  style={{
    position: "fixed",
    top: 0,
    left: 0,
    opacity: 0,
    pointerEvents: "none",
    zIndex: -1,
  }}
>
  <div ref={printableTicketRef}>
    <PrintableTicket ticket={ticket} />
  </div>
</div>

</div>
<TicketPreviewModal
  open={previewOpen}
  ticket={ticket}
  onClose={() => setPreviewOpen(false)}
/>
    </>
  );
}

export default TicketDetails;