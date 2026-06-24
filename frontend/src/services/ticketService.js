import axios from "../api/axios";

const ticketService = {

  getMyTickets: async (token) => {
    return await axios.get("/tickets/my", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
getTicketById: async (id, token) => {
  return await axios.get(`/tickets/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
},
verifyTicket: async (ticketId, token) => {
  return await axios.get(
    `/tickets/verify/${ticketId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
},
checkInTicket: async (ticketId, token) => {
  return await axios.patch(
    `/tickets/checkin/${ticketId}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
},
getCheckInHistory: async (token) => {
  return await axios.get(
    "/tickets/history",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
},

};

export default ticketService;