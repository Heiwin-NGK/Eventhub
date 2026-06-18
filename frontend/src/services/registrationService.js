import axios from "../api/axios";

const registrationService = {

  register: async (eventId, token) => {
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

};

export default registrationService;