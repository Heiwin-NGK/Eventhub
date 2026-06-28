import { useEffect, useState, useCallback } from "react";
import eventService from "../services/eventService";
import registrationService from "../services/registrationService";
import EmptyState from "../components/EmptyState";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import { getErrorMessage } from "../utils/errorHandler";
import { showSuccess } from "../utils/successHandler";
import { confirmAction } from "../utils/confirmHandler";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { ROLES } from "../constants/roles";
import EventFilters from "../components/EventFilters";
import EventCard from "../components/EventCard";
import { ROUTES,getEventDetailsRoute,getEditEventRoute,getAttendeesRoute,} from "../constants/routes";
import SkeletonLoader from "../components/SkeletonLoader";

function Events() {
const { user } = useContext(AuthContext);
const [events, setEvents] = useState([]);
const [loading, setLoading] = useState(true);
const [search,setSearch]=useState("");
const [type,setType]=useState("All");
const [venue,setVenue]=useState("");
const [status,setStatus]=useState("All");
const [sort,setSort]=useState("newest");
const [currentPage, setCurrentPage] = useState(1);
const [totalPages, setTotalPages] = useState(1);
const [filters, setFilters] = useState({
  search: "",
  type: "All",
  venue: "",
  status: "All",
  sort: "newest",
});
useEffect(() => {
  fetchEvents();
}, [currentPage, filters]);

const fetchEvents=async()=>{
try{
setLoading(true);
const token=localStorage.getItem("token");
const res=await eventService.getEvents(
{search: filters.search,
type: filters.type,
venue: filters.venue,
status: filters.status,
sort: filters.sort,page:currentPage,limit:9},token);
setEvents(res.data.events);
setTotalPages(res.data.totalPages);
}catch(error){
alert(getErrorMessage(error));
}finally{
setLoading(false);
}
};
useEffect(() => {
  setFilters({
    search: "",
    type: "All",
    venue: "",
    status: "All",
    sort: "newest",
  });
}, []);

  const registerEvent = async (
  eventId
) => {
  try {
    setLoading(true);

    const token =
      localStorage.getItem(
        "token"
      );

    const res =await registrationService.registerForEvent(eventId, token);

setEvents((prev) =>
  prev.map((event) =>
    event._id === eventId
      ? {
          ...event,
          registrationCount: event.registrationCount + 1,
          remainingSeats: event.remainingSeats - 1,
          attendeeRegistered: true,
          isFull: event.remainingSeats - 1 <= 0,
        }
      : event
  )
);
    console.log(
      res.data
    );

  } catch (error) {

    alert(
      getErrorMessage(error)
    );
  }finally{

setLoading(false);

}
};

const deleteEvent = async (id) => {
  if (
  !confirmAction(
    "Are you sure you want to delete this event?"
  )
) {
  return;
}
  try {
    setLoading(true);

    const token =
      localStorage.getItem("token");

    await eventService.deleteEvent(id, token);

    showSuccess("Event Deleted Successfully");

    fetchEvents();

  } catch (error) {
    alert(
      error.response?.data?.message ||
      "Delete Failed"
    );
  }
  finally{

setLoading(false);

}
};
const applyFilters = useCallback(() => {
  setCurrentPage(1);

  setFilters({
    search,
    type,
    venue,
    status,
    sort,
  });
}, [search, type, venue, status, sort]);
const clearFilters = useCallback(() => {
  setSearch("");
  setType("All");
  setVenue("");
  setStatus("All");
  setSort("newest");

  setCurrentPage(1);

  setFilters({
    search: "",
    type: "All",
    venue: "",
    status: "All",
    sort: "newest",
  });
}, []);

if (loading)
  return <SkeletonLoader count={6} />;

  return (
    <>
      <Navbar />
      <div className="container">
<EventFilters

search={search}
setSearch={setSearch}

type={type}
setType={setType}

venue={venue}
setVenue={setVenue}

status={status}
setStatus={setStatus}

sort={sort}
setSort={setSort}
applyFilters={applyFilters}
clearFilters={clearFilters}
/>

        <h1>Events</h1>

      {events.length === 0 ? (

  <EmptyState title="No Events Available" />

) : (
events.map((event) => {
const userId = String(
  user?._id || user?.id
);

const organizerId = String(
  event.organizerId?._id ||
  event.organizerId
);

const canManage =
  user?.role === ROLES.ADMIN ||
  (
    user?.role === ROLES.ORGANIZER &&
    organizerId === userId
  );
  return (
<EventCard
  key={event._id}
  event={event}
>

<Link
  className="button-link"
  to={getEventDetailsRoute(event._id)}
>
  View Details
</Link>

{" "}

{user?.role === ROLES.ATTENDEE && (
  <>
    {event.attendeeRegistered ? (
      <button disabled>
        ✓ Already Registered
      </button>
    ) : event.isFull ? (
      <button disabled>
        Event Full
      </button>
    ) : event.status === "Completed" ? (
      <button disabled>
        Completed
      </button>
    ) : event.status === "Cancelled" ? (
      <button disabled>
        Cancelled
      </button>
    ) : (
      <button
        disabled={loading}
        onClick={() => registerEvent(event._id)}
      >
        Register
      </button>
    )}
  </>
)}
  
{" "}

  {canManage && (
    <>

      <Link
  className="button-link"
  to={getAttendeesRoute(event._id)}
>
  View Attendees
</Link>
{" "}
      <Link
        className="button-link"
        to={getEditEventRoute(event._id)}
      >
        Edit
      </Link>
{" "}

      <button
        onClick={() => deleteEvent(event._id)}
      >
        Delete
      </button>
    </>
  )}

</EventCard>

  );

}) )}
{events.length > 0 && (
  <div
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      gap: "15px",
      marginTop: "30px",
    }}
  >
    <button
      disabled={currentPage === 1}
      onClick={() =>
        setCurrentPage((prev) => prev - 1)
      }
    >
      Previous
    </button>

    <span>
      Page {currentPage} of {totalPages}
    </span>

    <button
      disabled={
        currentPage === totalPages
      }
      onClick={() =>
        setCurrentPage((prev) => prev + 1)
      }
    >
      Next
    </button>
  </div>
)}
    </div>
    </>
  );
}

export default Events;