import { useEffect,useState,} from "react";
import ticketService from "../services/ticketService";
import Loader from "../components/Loader";
import EmptyState from "../components/EmptyState";
import axios from "../api/axios";
import Navbar from "../components/Navbar";
import { getErrorMessage } from "../utils/errorHandler";
import { showSuccess } from "../utils/successHandler";
import TicketCard from "../components/TicketCard";
import SkeletonLoader from "../components/SkeletonLoader";
function MyTickets() {

const [tickets, setTickets] = useState([]);
const [loading, setLoading] = useState(true);
const [currentPage, setCurrentPage] = useState(1);
const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchTickets();
  }, [currentPage]);

  const fetchTickets =
    async () => {

      try {
        setLoading(true);
        const token =
          localStorage.getItem(
            "token"
          );

        const res =
          await ticketService.getMyTickets({page: currentPage,limit: 10,},token);

setTickets(res.data.tickets);
setTotalPages(res.data.totalPages);

      } catch (error) {
        alert(getErrorMessage(error));
        } finally {

    setLoading(false);

  }
    };
if (loading) {
  return <SkeletonLoader count={5} />;
}

  return (
    <>
      <Navbar />

      <h1>
        My Tickets
      </h1>

      {tickets.length === 0 ? (

<EmptyState title="No Tickets Found" />

) : (

tickets.map((ticket) => (

  <TicketCard
    key={ticket._id}
    ticket={ticket}
  />

))
)}
{tickets.length > 0 && (
  <div
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      gap: "15px",
      marginTop: "30px",
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
    </>
  );
}

export default MyTickets;