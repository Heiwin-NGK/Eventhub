import { useEffect, useState } from "react";
import axios from "../api/axios";
import Navbar from "../components/Navbar";

function Notifications() {
  const [notifications, setNotifications] =
    useState([]);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const token =
        localStorage.getItem("token");

      const res =
        await axios.get(
          "/notifications/my",
          {
            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          }
        );

      setNotifications(
        res.data
      );

    } catch (error) {
      console.log(error);
    }
  };

  const markAsRead = async (id) => {
    try {
      const token =
        localStorage.getItem("token");

      await axios.put(
        `/notifications/read/${id}`,
        {},
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

      fetchNotifications();

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Navbar />

      <h1>Notifications</h1>

      {notifications.map((n) => (
        <div
          key={n._id}
          style={{
            border:
              "1px solid black",
            margin: "10px",
            padding: "10px",
          }}
        >
          <h3>{n.title}</h3>

          <p>{n.message}</p>

          <p>
            Status:
            {n.isRead
              ? " Read"
              : " Unread"}
          </p>

          {!n.isRead && (
            <button
              onClick={() =>
                markAsRead(
                  n._id
                )
              }
            >
              Mark Read
            </button>
          )}
        </div>
      ))}
    </>
  );
}

export default Notifications;