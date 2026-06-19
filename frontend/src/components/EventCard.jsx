import StatusBadge from "./StatusBadge";

function EventCard({

event,

children,

}) {

return (

<div className="card">

<h2>{event.title}</h2>

<StatusBadge status={event.status}/>

<p><strong>Type:</strong> {event.eventType}</p>

<hr />

<p> 📍 {event.venue}</p>

<p>📅 {new Date(event.startDate).toLocaleDateString()}</p>

<p>👥 Capacity: {event.capacity} </p>


<div style={{marginTop:"15px",}}>{children}</div>

</div>

);

}

export default EventCard;