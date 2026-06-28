import { useEffect,useState,} from "react";
import axios from "../api/axios";
import Navbar from "../components/Navbar";
import { getErrorMessage } from "../utils/errorHandler";
import { showSuccess } from "../utils/successHandler";
import analyticsService from "../services/analyticsService";
import Loader from "../components/Loader";
import EmptyState from "../components/EmptyState";
import SkeletonLoader from "../components/SkeletonLoader";
function Analytics() {

  const [stats, setStats] =
    useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats =
    async () => {

      try {
        setLoading(true);

        const token =
          localStorage.getItem(
            "token"
          );

        const res =
          await analyticsService.getDashboard(token);

        setStats(
          res.data
        );

      } catch (error) {
        alert(getErrorMessage(error));
        } finally {

    setLoading(false);

  }
    };

if (loading)
  return <SkeletonLoader count={4} />;

if (!stats)
return <div className="card">
  <h2>No Analytics Available</h2></div>;
  return (
    <>
      <Navbar />
<div className="card">
      <h1>
        Analytics Dashboard
      </h1>
</div>
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