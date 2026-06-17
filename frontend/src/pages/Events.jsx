import { useEffect, useState } from "react";
import axios from "../api/axios";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";

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

      const res =
        await axios.get(
          "/events",
          {
            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          }
        );

      setEvents(res.data);

    } catch (error) {

    alert(
      error.response?.data?.message ||
      "Something went wrong"
    );

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
      await axios.post(
        `/registrations/${eventId}`,
        {},
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

    alert(
      "Registered Successfully"
    );

    console.log(
      res.data
    );

  } catch (error) {

    alert(
      error.response.data
        .message
    );

  }
};

const deleteEvent = async (id) => {
  try {
    setLoading(true);

    const token =
      localStorage.getItem("token");

    await axios.delete(
      `/events/${id}`,
      {
        headers: {
          Authorization:
            `Bearer ${token}`,
        },
      }
    );

    alert("Event Deleted");

    fetchEvents();

  } catch (error) {
    alert(
      error.response?.data?.message ||
      "Delete Failed"
    );
  }
};

if (loading)
  return <h2>Loading...</h2>;

  return (
    <>
      <Navbar />
      <div>
        <h1>Events</h1>

      {events.map((event) => (
        <div
          key={event._id}
          style={{
            border:
              "1px solid black",
            margin: "10px",
            padding: "10px",
          }}
        >
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
          <button onClick={() => registerEvent(event._id)}
>  Register </button>
          <Link to={`/edit-event/${event._id}`
        }> Edit </Link>
          <button onClick={() => deleteEvent(event._id)}
>  Delete </button>
        </div>
      ))}
    </div>
    </>
  );
}

export default Events;