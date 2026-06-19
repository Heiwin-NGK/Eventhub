import StatusBadge from "./StatusBadge";
import CapacityBar from "./CapacityBar";
import Countdown from "./Countdown";
import { formatDate } from "../utils/dateFormatter";

function EventCard({ event, children }) {
  return (
    <div className="card">

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h2>{event.title}</h2>

        <StatusBadge
          status={event.isFull ? "Full" : event.status}
        />
      </div>

      <p>
        <strong>Type:</strong> {event.eventType}
      </p>

      <p>
        📍 {event.venue}
      </p>

      <p>
        📅 {formatDate(event.startDate)}
      </p>

      <CapacityBar
        current={event.registrationCount}
        total={event.capacity}
      />

      <p>
        👥 Registered: {event.registrationCount}
      </p>

      <p>
        💺 Remaining: {event.remainingSeats}
      </p>

      <Countdown
        startDate={event.startDate}
        endDate={event.endDate}
      />

      <hr />

      <div
        style={{
          marginTop: "15px",
        }}
      >
        {children}
      </div>

    </div>
  );
}

export default EventCard;