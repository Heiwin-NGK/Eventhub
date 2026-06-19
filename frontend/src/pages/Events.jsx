import { useEffect, useState } from "react";
import eventService from "../services/eventService";
import registrationService from "../services/registrationService";
import Loader from "../components/Loader";
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
import { ROUTES,getEventDetailsRoute,getEditEventRoute } from "../constants/routes";

function Events() {
const { user } = useContext(AuthContext);
const [events, setEvents] = useState([]);
const [loading, setLoading] = useState(true);
const [search,setSearch]=useState("");
const [type,setType]=useState("All");
const [venue,setVenue]=useState("");
const [status,setStatus]=useState("All");
const [sort,setSort]=useState("newest");

useEffect(()=>{
fetchEvents();
},[search,type,venue,status,sort,]);

const fetchEvents=async()=>{
try{
setLoading(true);
const token=localStorage.getItem("token");
const res=await eventService.getEvents(
{search,type,venue,status,sort,},token);
setEvents(res.data);
}catch(error){
alert(getErrorMessage(error));
}finally{
setLoading(false);
}
};

  const registerEvent = async (
  eventId
) => {
  try {
    setLoading(true);

    const token =
      localStorage.getItem(
        "token"
      );

    const res =
      await registrationService.registerForEvent(eventId, token);

    showSuccess("Successfully Registered for Event");
    fetchEvents();
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

if (loading)
  return <Loader />;

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

clearFilters={()=>{
setSearch("");
setType("All");
setVenue("");
setStatus("All");
setSort("newest");
}}

/>
        <h1>Events</h1>

      {events.length === 0 ? (

  <EmptyState title="No Events Available" />

) : (
events.map((event) => {

  const canManage =
    user?.role === ROLES.ADMIN ||
    (
      user?.role === ROLES.ORGANIZER &&
      (
        event.organizerId === user.id ||
        event.organizerId?._id === user.id
      )
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
    <button
      disabled={loading}
      onClick={() => registerEvent(event._id)}
    >
      Register
    </button>
  )}{" "}

  {canManage && (
    <>
      <Link
        className="button-link"
        to={`/edit-event/${event._id}`}
      >
        Edit
      </Link>{" "}

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
    </div>
    </>
  );
}

export default Events;