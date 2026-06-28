import { useState } from "react";
import Navbar from "../components/Navbar";
import { getErrorMessage } from "../utils/errorHandler";
import { showSuccess } from "../utils/successHandler";
import { validateRequired,validateCapacity,} from "../utils/validation";
import eventService from "../services/eventService";
import { SUCCESS_MESSAGES } from "../constants/messages";

function CreateEvent() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [venue, setVenue] = useState("");
  const [capacity, setCapacity] = useState("");
  const [eventType, setEventType] = useState("Workshop");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [loading,setLoading]=useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();

if (
  !validateRequired(
    title,
    description,
    venue,
    capacity,
    startDate,
    endDate
  )
)
if (!validateCapacity(capacity)) {
  alert(
    "Capacity must be greater than zero."
  );
  return;
}
if (
  new Date(endDate) <
  new Date(startDate)
) {
  alert(
    "End date cannot be before start date."
  );
  return;
}

    try {
      if(loading) return;

setLoading(true);

      const token =
        localStorage.getItem("token");
const data = {title,description,
  venue,capacity,eventType,
  startDate,
  endDate,
};

const res = await eventService.createEvent(data, token);

showSuccess(SUCCESS_MESSAGES.EVENT_CREATED);
setTitle("");
setDescription("");
setVenue("");
setCapacity("");
setEventType("Workshop");
setStartDate("");
setEndDate("");

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

<select
  value={eventType}
  onChange={(e) =>
    setEventType(e.target.value)
  }
>
  <option value="Workshop">
    Workshop
  </option>

  <option value="Seminar">
    Seminar
  </option>

  <option value="Conference">
    Conference
  </option>

  <option value="Hackathon">
    Hackathon
  </option>

  <option value="Meetup">
    Meetup
  </option>

  <option value="Webinar">
    Webinar
  </option>
</select>

<br />

<input
  type="date"
  value={startDate}
  onChange={(e) =>
    setStartDate(e.target.value)
  }
/>

<br />

<input
  type="date"
  value={endDate}
  onChange={(e) =>
    setEndDate(e.target.value)
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