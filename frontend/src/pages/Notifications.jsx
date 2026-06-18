import { useEffect, useState } from "react";
import axios from "../api/axios";
import Navbar from "../components/Navbar";
import { getErrorMessage } from "../utils/errorHandler";
import { showSuccess } from "../utils/successHandler";

function Notifications() {
  const [notifications, setNotifications] =
    useState([]);
    const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
        setLoading(true);
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
      alert(getErrorMessage(error));
     } finally {

    setLoading(false);

  }
  };

  const markAsRead = async (id) => {
    try {
        setLoading(true);
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

showSuccess("Notification Marked as Read");

    } catch (error) {
      alert(getErrorMessage(error));
    } finally {
      setLoading(false);
    }
  };
  if(loading)
return <h2>Loading Notifications...</h2>;

  return (
    <>
      <Navbar />

      <h1>Notifications</h1>

      {notifications.length === 0 ? (

<h3>No Notifications</h3>

) : (

notifications.map((n) => (
        <div className="container"
          key={n._id}
          className="card"
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
            <button disabled={loading}
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
      )) )}
    </>
  );
}

export default Notifications;