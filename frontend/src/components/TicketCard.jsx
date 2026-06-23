import { Link } from "react-router-dom";
import { getTicketDetailsRoute } from "../constants/routes";

function TicketCard({ ticket }) {
  return (
    <div className="card">

      <h3>{ticket.ticketId}</h3>

      <p>
        <strong>Event:</strong>{" "}
        {ticket.eventId?.title}
      </p>

      <Link
        className="button-link"
        to={getTicketDetailsRoute(ticket._id)}
      >
        View Ticket
      </Link>

    </div>
  );
}

export default TicketCard;