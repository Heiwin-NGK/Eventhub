import {
  useEffect,
  useState,
} from "react";

import axios
  from "../api/axios";

import Navbar
  from "../components/Navbar";

function MyTickets() {

  const [
    tickets,
    setTickets,
  ] = useState([]);

  useEffect(() => {
    fetchTickets();
  }, []);

  const fetchTickets =
    async () => {

      try {

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
        console.log(error);
      }
    };

  return (
    <>
      <Navbar />

      <h1>
        My Tickets
      </h1>

      {tickets.map(
        (ticket) => (
          <div
            key={
              ticket._id
            }
            style={{
              border:
                "1px solid black",
              margin:
                "10px",
              padding:
                "10px",
            }}
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
      )}
    </>
  );
}

export default MyTickets;