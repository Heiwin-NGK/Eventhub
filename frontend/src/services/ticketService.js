import axios from "../api/axios";

const ticketService = {

getMyTickets: async ( params,token) => {
  return await axios.get(
    "/tickets/my",
    {
      params,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
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
getCheckInHistory: async (params, token) => {
  return await axios.get(
    "/tickets/history",
    {
      params,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
},
};

export default ticketService;