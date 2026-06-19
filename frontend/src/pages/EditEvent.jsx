import { useState,useEffect,} from "react";
import { useParams,useNavigate,} from "react-router-dom";
import { getErrorMessage } from "../utils/errorHandler";
import { showSuccess } from "../utils/successHandler";
import { validateRequired,} from "../utils/validation";
import eventService from "../services/eventService";
import Loader from "../components/Loader";

function EditEvent() {

  const { id } =
    useParams();

  const navigate =
    useNavigate();

  const [title, setTitle] =
    useState("");

  const [description,
    setDescription] =
    useState("");

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchEvent();
  }, []);

  const fetchEvent =
    async () => {

      try {
        setLoading(true);
        const token =
          localStorage.getItem(
            "token"
          );

const res = await eventService.getEventById(id,token);
setTitle(res.data.title);
setDescription(
  res.data.description
);

      } catch (error) { 
        alert(getErrorMessage(error));
      }
      finally {setLoading(false);}
    };

  const handleSubmit =
    async (e) => {

      e.preventDefault();
      if (
  !validateRequired(
    title,
    description
  )
) {
  alert("All fields are required.");
  return;
}

      try {if(loading) return;

setLoading(true);

const token = localStorage.getItem("token");
const data = {title, description,};
        await eventService.updateEvent(id, data, token);

        showSuccess("Event Updated Successfully");

        navigate(
          "/events"
        );

      } catch (error) {
        alert(getErrorMessage(error));
      }
      finally {setLoading(false);}
    };
          if (!title && !description)
return <Loader />;

  return (
    <div className="container">

      <div className="card">
        <h1>
          Edit Event
        </h1>
      </div>
      <div className="container">
        <form
          onSubmit={
          handleSubmit
        }
      >

        <input
          value={title}
          onChange={(e) =>
            setTitle(
              e.target.value
            )
          }
        />

        <br />

        <input
          value={
            description
          }
          onChange={(e) =>
            setDescription(
              e.target.value
            )
          }
        />

        <br />

        <button disabled={loading}>
{loading ? "Saving..." : "Save"}
</button>

      </form>
</div>
    </div>
  );
}

export default EditEvent;