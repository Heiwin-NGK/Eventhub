import {
  useEffect,
  useState,
} from "react";

import axios
  from "../api/axios";

import Navbar
  from "../components/Navbar";

function Analytics() {

  const [stats, setStats] =
    useState(null);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats =
    async () => {

      try {

        const token =
          localStorage.getItem(
            "token"
          );

        const res =
          await axios.get(
            "/analytics/dashboard",
            {
              headers: {
                Authorization:
                  `Bearer ${token}`,
              },
            }
          );

        setStats(
          res.data
        );

      } catch (error) {
        console.log(error);
      }
    };

  if (!stats)
    return (
      <div>
        Loading...
      </div>
    );

  return (
    <>
      <Navbar />

      <h1>
        Analytics Dashboard
      </h1>

      <p>
        Users:
        {stats.totalUsers}
      </p>

      <p>
        Events:
        {stats.totalEvents}
      </p>

      <p>
        Registrations:
        {stats.totalRegistrations}
      </p>

      <p>
        Tickets:
        {stats.totalTickets}
      </p>

      <p>
        Attendance:
        {stats.totalAttendance}
      </p>

    </>
  );
}

export default Analytics;