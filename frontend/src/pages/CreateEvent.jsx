import { useState } from "react";
import axios from "../api/axios";
import Navbar from "../components/Navbar";

function CreateEvent() {
  const [title, setTitle] =
    useState("");

  const [description, setDescription] =
    useState("");

  const [venue, setVenue] =
    useState("");

  const [capacity, setCapacity] =
    useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      const token =
        localStorage.getItem("token");

      const res =
        await axios.post(
          "/events",
          {
            title,
            description,
            venue,
            capacity,
            eventType: "Workshop",
            startDate:
              "2026-12-01",
            endDate:
              "2026-12-02",
          },
          {
            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          }
        );

      alert(
        "Event Created"
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

      <h1>
        Create Event
      </h1>

      <form
        onSubmit={
          handleSubmit
        }
      >
        <input
          placeholder="Title"
          value={title}
          onChange={(e) =>
            setTitle(
              e.target.value
            )
          }
        />

        <br />

        <input
          placeholder="Description"
          value={description}
          onChange={(e) =>
            setDescription(
              e.target.value
            )
          }
        />

        <br />

        <input
          placeholder="Venue"
          value={venue}
          onChange={(e) =>
            setVenue(
              e.target.value
            )
          }
        />

        <br />

        <input
          placeholder="Capacity"
          value={capacity}
          onChange={(e) =>
            setCapacity(
              e.target.value
            )
          }
        />

        <br />

        <button>
          Create
        </button>

      </form>
    </>
  );
}

export default CreateEvent;