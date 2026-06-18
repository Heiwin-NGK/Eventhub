import { useState } from "react";
import axios from "../api/axios";
import Navbar from "../components/Navbar";
import { getErrorMessage } from "../utils/errorHandler";
import { showSuccess } from "../utils/successHandler";
import { validateRequired,validateCapacity,} from "../utils/validation";
import eventService from "../services/eventService";
import { SUCCESS_MESSAGES } from "../constants/messages";

function CreateEvent() {
  const [title, setTitle] =
    useState("");

  const [description, setDescription] =
    useState("");

  const [venue, setVenue] =
    useState("");

  const [capacity, setCapacity] =
    useState("");
  
  const [loading,setLoading]=useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
  !validateRequired(
    title,
    description,
    venue,
    capacity
  )
) {
  alert("Please fill all fields.");
  return;
}

if (!validateCapacity(capacity)) {
  alert(
    "Capacity must be greater than zero."
  );
  return;
}

    try {
      if(loading) return;

setLoading(true);

      const token =
        localStorage.getItem("token");

      const res =
        await eventService.createEvent(data, token);

showSuccess(SUCCESS_MESSAGES.EVENT_CREATED);

      console.log(
        res.data
      );

    } catch (error) {
      alert(getErrorMessage(error));
      }finally{

setLoading(false);

}
  };

  return (
    <>
      <Navbar />
<div className="card">
      <h1>
        Create Event
      </h1></div>
<div className="container">
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

        <button disabled={loading}>
          {loading ? "Creating..." : "Create"}
        </button>

      </form> </div>
    </>
  );
}

export default CreateEvent;