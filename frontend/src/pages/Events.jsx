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

function Events() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
        setLoading(true);
      const token =
        localStorage.getItem("token");

const res = await eventService.getEvents(token);

      setEvents(res.data);

    } catch (error) {
      alert(getErrorMessage(error));
      } finally {

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
        <h1>Events</h1>

      {events.length === 0 ? (

  <EmptyState title="No Events Available" />

) : (

  events.map((event) => (
        <div
          key={event._id}
          className="card"
        >
          <div className="card">
          <h3>{event.title}</h3>

          <p>
            {event.description}
          </p>

          <p>
            {event.venue}
          </p>

          <p>
            Capacity:
            {event.capacity}
          </p>
          </div>
          <button disabled={loading} onClick={() => registerEvent(event._id)}
>  Register </button>{" "}
          <Link className="button-link" to=
          {`/edit-event/${event._id}`}
> Edit </Link>{" "}
          <button onClick={() => deleteEvent(event._id)}
>  Delete </button>
        </div>
      )) )}
    </div>
    </>
  );
}

export default Events;