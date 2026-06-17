import {
  useState,
  useEffect,
} from "react";

import {
  useParams,
  useNavigate,
} from "react-router-dom";

import axios from "../api/axios";

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

  useEffect(() => {
    fetchEvent();
  }, []);

  const fetchEvent =
    async () => {

      try {

        const token =
          localStorage.getItem(
            "token"
          );

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

        const event =
          res.data.find(
            (e) =>
              e._id === id
          );

        if (event) {

          setTitle(
            event.title
          );

          setDescription(
            event.description
          );
        }

      } catch (error) {
        console.log(error);
      }
    };

  const handleSubmit =
    async (e) => {

      e.preventDefault();

      try {

        const token =
          localStorage.getItem(
            "token"
          );

        await axios.put(
          `/events/${id}`,
          {
            title,
            description,
          },
          {
            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          }
        );

        alert(
          "Updated"
        );

        navigate(
          "/events"
        );

      } catch (error) {
        console.log(error);
      }
    };

  return (
    <div>

      <h1>
        Edit Event
      </h1>

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

        <button>
          Save
        </button>

      </form>

    </div>
  );
}

export default EditEvent;