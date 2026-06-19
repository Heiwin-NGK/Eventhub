import axios from "../api/axios";

const registrationService = {
  registerForEvent: async (eventId, token) => {
    return await axios.post(
      `/registrations/${eventId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  },

  getMyRegistrations: async (token) => {
    return await axios.get("/registrations/my", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
  getEventRegistrations: async (eventId, token) => {
  return await axios.get(`/registrations/event/${eventId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
},

removeRegistration: async (registrationId, token) => {
  return await axios.delete(`/registrations/${registrationId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
},

updateRegistrationStatus: async (registrationId, status, token) => {
  return await axios.patch(
    `/registrations/${registrationId}/status`,
    { status },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
},
};



export default registrationService;