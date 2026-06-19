import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Loader from "../components/Loader";
import EmptyState from "../components/EmptyState";
import RegistrationTable from "../components/RegistrationTable";
import registrationService from "../services/registrationService";
import { getErrorMessage } from "../utils/errorHandler";
import { showSuccess } from "../utils/successHandler";
import StatusBadge from "../components/StatusBadge";
import CapacityBar from "../components/CapacityBar";
import StatsCard from "../components/StatsCard";
import { formatDate } from "../utils/dateFormatter";

function EventAttendees() {
  const { id } = useParams();

  const [registrations, setRegistrations] = useState([]);
  const [event, setEvent] = useState(null);
  const [filteredRegistrations, setFilteredRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchRegistrations();
  }, []);

  useEffect(() => {
    const value = search.toLowerCase();

    setFilteredRegistrations(
      registrations.filter((registration) =>
        registration.userId?.name
          ?.toLowerCase()
          .includes(value) ||
        registration.userId?.email
          ?.toLowerCase()
          .includes(value)
      )
    );
  }, [search, registrations]);

  const fetchRegistrations = async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const res =
        await registrationService.getEventRegistrations(
          id,
          token
        );

      setEvent(res.data.event);
      setRegistrations(res.data.registrations);
      setFilteredRegistrations(res.data.registrations);

    } catch (error) {
      alert(getErrorMessage(error));
    } finally {
      setLoading(false);
    }
  };

  const removeRegistration = async (registrationId) => {
    try {
      const token = localStorage.getItem("token");

      await registrationService.removeRegistration(
        registrationId,
        token
      );

      showSuccess("Registration Removed");

      await fetchRegistrations();

    } catch (error) {
      alert(getErrorMessage(error));
    }
  };

  const checkIn = async (registrationId) => {
    try {
      const token = localStorage.getItem("token");

      await registrationService.updateRegistrationStatus(
        registrationId,
        "checked_in",
        token
      );

      showSuccess("Attendee Checked In");

      await fetchRegistrations();

    } catch (error) {
      alert(getErrorMessage(error));
    }
  };

if (loading) {
  return <Loader />;
}

if (!event) {
  return <EmptyState title="Event Not Found" />;
}

  return (
    <>
  <Navbar />

  <div className="container">

    {/* Header Card */}

    <div className="card">
      ...
    </div>

<p>
  <strong>Organizer:</strong>{" "}
  {event.organizer?.name}
</p>

<p>
  <strong>Email:</strong>{" "}
  {event.organizer?.email}
</p>

    {/* Statistics Cards */}

    <div
style={{
  display: "grid",
  gridTemplateColumns:
    "repeat(auto-fit,minmax(180px,1fr))",
  gap: "15px",
  marginBottom: "20px",
}}
    >
      <StatsCard
        title="Capacity"
        value={event.capacity}
      />

      <StatsCard
        title="Registered"
        value={event.registrationCount}
      />

      <StatsCard
        title="Remaining"
        value={event.remainingSeats}
      />

      <StatsCard
        title="Occupancy"
        value={`${event.occupancy}%`}
      />
    </div>

    {/* Capacity Bar */}

    <div className="card">
      <CapacityBar
        current={event.registrationCount}
        total={event.capacity}
      />
    </div>

<p
  style={{
    marginTop: "10px",
    textAlign: "center",
  }}
>
  {event.registrationCount} / {event.capacity} Seats Filled
</p>

    {/* Search */}

<div className="card">
  <input
    type="text"
    placeholder="Search attendee..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
  />
</div>

    {/* Table */}

    {filteredRegistrations.length === 0 ? (
<EmptyState title="No attendees have registered for this event yet."/>      
    ) : (
      <RegistrationTable
        registrations={filteredRegistrations}
        onCheckIn={checkIn}
        onRemove={removeRegistration}
      />
    )}

  </div>
</>
  );
}

export default EventAttendees;