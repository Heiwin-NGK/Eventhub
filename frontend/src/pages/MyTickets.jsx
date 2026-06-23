import { useEffect,useState,} from "react";
import ticketService from "../services/ticketService";
import Loader from "../components/Loader";
import EmptyState from "../components/EmptyState";
import axios from "../api/axios";
import Navbar from "../components/Navbar";
import { getErrorMessage } from "../utils/errorHandler";
import { showSuccess } from "../utils/successHandler";
import TicketCard from "../components/TicketCard";

function MyTickets() {

  const [ tickets, setTickets, ] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTickets();
  }, []);

  const fetchTickets =
    async () => {

      try {
        setLoading(true);
        const token =
          localStorage.getItem(
            "token"
          );

        const res =
          await ticketService.getMyTickets(token);

        setTickets(
          res.data
        );

      } catch (error) {
        alert(getErrorMessage(error));
        } finally {

    setLoading(false);

  }
    };
    if(loading)
return <Loader />;

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
    </>
  );
}

export default MyTickets;