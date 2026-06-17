import { useEffect, useState } from "react";
import axios from "../api/axios";
import Navbar from "../components/Navbar";

function Events() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
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
      console.log(error);
    }
  };

  const registerEvent = async (
  eventId
) => {
  try {

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
        </div>
      ))}
    </div>
    </>
  );
}

export default Events;