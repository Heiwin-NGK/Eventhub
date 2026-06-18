import {
  useEffect,
  useState,
} from "react";

import axios
  from "../api/axios";

import Navbar
  from "../components/Navbar";
import { getErrorMessage } from "../utils/errorHandler";
import { showSuccess } from "../utils/successHandler";

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
          await axios.get(
            "/tickets/my",
            {
              headers: {
                Authorization:
                  `Bearer ${token}`,
              },
            }
          );

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
return <h2>Loading Tickets...</h2>;

  return (
    <>
      <Navbar />

      <h1>
        My Tickets
      </h1>

      {tickets.length === 0 ? (

<h3>No Tickets Found</h3>

) : (

tickets.map(
        (ticket) => (
          <div className="container"
            key={
              ticket._id
            }
            className="card"
          >
            <h3>
              {
                ticket.ticketId
              }
            </h3>

            <p>
              Event:
              {
                ticket.eventId
                  ?.title
              }
            </p>

          </div>
        )
      ) )}
    </>
  );
}

export default MyTickets;