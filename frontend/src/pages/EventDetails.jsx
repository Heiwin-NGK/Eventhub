import {useEffect,useState,useContext,} from "react";
import {useParams,Link,} from "react-router-dom";
import Navbar from "../components/Navbar";
import Loader from "../components/Loader";
import eventService from "../services/eventService";
import { AuthContext } from "../context/AuthContext";
import { ROLES } from "../constants/roles";
import { getErrorMessage } from "../utils/errorHandler";
import StatusBadge from "../components/StatusBadge";
import SectionCard from "../components/SectionCard";
import EventInfo from "../components/EventInfo";
import { ROUTES,getAttendeesRoute,getEditEventRoute, } from "../constants/routes";
import CapacityBar from "../components/CapacityBar";
import Countdown from "../components/Countdown";
import { formatDate } from "../utils/dateFormatter";

function EventDetails(){
const {id}=useParams();
const {user}=useContext(AuthContext);
const [event,setEvent]=useState(null);
const [loading,setLoading]=useState(true);
useEffect(()=>{
fetchEvent();
},[]);

const fetchEvent=async()=>{
try{
const token=localStorage.getItem("token");
const res=await eventService.getEventById(id,token);
console.log(res.data);
setEvent(res.data);
}catch(error){
alert(
getErrorMessage(error)
);
}
finally{
setLoading(false);
}
};

if(loading)
return <Loader/>;
if(!event)
return <h2>Event Not Found</h2>;
const canManage=user?.role===ROLES.ADMIN ||
(
user?.role===ROLES.ORGANIZER &&
(
event.organizerId?._id===user.id
)
);
return(
<>
<Navbar/>
<div className="container">

<div className="card">

<h1>

{event.title}

</h1>

<p>

{event.eventType}

</p>

<p>
<strong>Type:</strong> {event.eventType}
</p>

<StatusBadge
  status={event.isFull ? "Full" : event.status}
/>

</div>

<SectionCard title="Description">

<p>

{event.description}

</p>

</SectionCard>

<SectionCard title="Organizer">

<EventInfo
label="Name"
value={event.organizerId?.name || "Unknown"}
/>

<EventInfo
label="Email"
value={event.organizerId?.email || "N/A"}
/>

</SectionCard>

<SectionCard title="Venue">

<EventInfo

label="Location"

value={event.venue}

/>

</SectionCard>

<SectionCard
title="Schedule"
>

<EventInfo
label="Start"
value={formatDate(event.startDate)}
/>

<EventInfo
label="End"
value={formatDate(event.endDate)}
/>

</SectionCard>

<SectionCard title="Event Status">

  <Countdown
    startDate={event.startDate}
    endDate={event.endDate}
  />

</SectionCard>

<SectionCard title="Capacity">

<EventInfo
label="Registered"
value={event.registrationCount}
/>
<EventInfo
label="Remaining"
value={event.remainingSeats}
/>
<EventInfo
label="Maximum"
value={event.capacity}
/>
<CapacityBar
  current={event.registrationCount}
  total={event.capacity}
/>
</SectionCard>

<div className="card" >

<Link
to={ROUTES.EVENTS}
className="button-link"
>
← Back
</Link>

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
  Edit Event
</Link>
<button>
Delete
</button>
</>
)}

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
      <button>
        Register
      </button>
    )}
  </>
)}

</div>

</div>
</>
);
}

export default EventDetails;