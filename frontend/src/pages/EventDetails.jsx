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
import { ROUTES } from "../constants/routes";

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

<StatusBadge
status={event.status}
/>

</div>

<SectionCard
title="Description"
>

<p>

{event.description}

</p>

</SectionCard>

<SectionCard
title="Organizer"
>

<EventInfo
label="Name"
value={event.organizerId?.name || "unknown"}
/>

<EventInfo
label="Email"
value={event.organizerId?.email || "N/A"}
/>

</SectionCard>

<SectionCard
title="Venue"
>

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

value={
new Date(
event.startDate
).toLocaleDateString()
}

/>

<EventInfo

label="End"

value={
new Date(
event.endDate
).toLocaleDateString()
}

/>

</SectionCard>

<SectionCard
title="Capacity"
>

<EventInfo

label="Maximum"

value={event.capacity}

/>

<EventInfo
label="Remaining"
value="Coming Soon"
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
<Link>
Edit Event
</Link>

<button>
Delete
</button>
</>
)}

{user?.role === ROLES.ATTENDEE && (
<button>
Register
</button>
)}

</div>

</div>
</>
);
}

export default EventDetails;