import axios from "../api/axios";

const ticketService = {

  getMyTickets: async (token) => {
    return await axios.get("/tickets/my", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },

  verifyTicket: async (ticketId) => {
    return await axios.get(`/verify/${ticketId}`);
  },

  getTicketById: async (id, token) => {
  return await axios.get(`/tickets/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
},

};

export default ticketService;