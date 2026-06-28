import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Loader from "../components/Loader";
import EmptyState from "../components/EmptyState";
import ticketService from "../services/ticketService";
import "../styles/checkInHistory.css";
import SkeletonLoader from "../components/SkeletonLoader";

function CheckInHistory() {
  const [history, setHistory] = useState([]);
  const [filteredHistory, setFilteredHistory] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchHistory();
  }, [currentPage]);

  useEffect(() => {
    const value = search.toLowerCase();

    setFilteredHistory(
      history.filter((item) =>
        item.userId?.name.toLowerCase().includes(value) ||
        item.eventId?.title.toLowerCase().includes(value) ||
        item.checkedInBy?.name?.toLowerCase().includes(value)
      )
    );
  }, [search, history]);

  const fetchHistory = async () => {
    try {
      const token = localStorage.getItem("token");

const res = await ticketService.getCheckInHistory(
  {
    page: currentPage,
    limit: 10,
  },
  token
);

setHistory(res.data.registrations);
setFilteredHistory(res.data.registrations);
setTotalPages(res.data.totalPages);

    } catch (error) {
      alert(error.response?.data?.message || "Failed to load history");
    } finally {
      setLoading(false);
    }
  };

if (loading) {
  return <SkeletonLoader count={8} />;
}

  return (
    <>
      <Navbar />

      <div className="container">

        <div className="card">

          <h1>Check-In History</h1>

          <p>Total Checked-In: {history.length}</p>

          <input
            type="text"
            placeholder="Search attendee, event or organizer..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

        </div>

        {filteredHistory.length === 0 ? (
          <EmptyState title="No Check-Ins Found" />
        ) : (
          <table className="history-table">

            <thead>

              <tr>

                <th>Attendee</th>

                <th>Event</th>

                <th>Checked In At</th>

                <th>Checked In By</th>

              </tr>

            </thead>

            <tbody>

              {filteredHistory.map((item) => (

                <tr key={item._id}>

                  <td>

                    <strong>{item.userId?.name}</strong>

                    <br />

                    {item.userId?.email}

                  </td>

                  <td>

                    <strong>{item.eventId?.title}</strong>

                    <br />

                    {item.eventId?.venue}

                  </td>

                  <td>

                    {new Date(
                      item.checkedInAt
                    ).toLocaleString("en-IN")}

                  </td>

                  <td>

                    {item.checkedInBy?.name}

                  </td>

                </tr>

              ))}

            </tbody>

          </table>
        )}
{history.length > 0 && (
  <div
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      gap: "1rem",
      marginTop: "20px",
    }}
  >
    <button
      disabled={currentPage === 1}
      onClick={() =>
        setCurrentPage((prev) => prev - 1)
      }
    >
      Previous
    </button>

    <span>
      Page {currentPage} of {totalPages}
    </span>

    <button
      disabled={currentPage === totalPages}
      onClick={() =>
        setCurrentPage((prev) => prev + 1)
      }
    >
      Next
    </button>
  </div>
)}

      </div>
    </>
  );
}

export default CheckInHistory;