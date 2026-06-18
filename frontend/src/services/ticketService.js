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

};

export default ticketService;