import axios from "../api/axios";

const reportService = {

  getRegistrations: async (eventId, token) => {
    return await axios.get(
      `/reports/registrations/${eventId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  },

  downloadCSV: async (eventId, token) => {
    return await axios.get(
      `/reports/registrations-csv/${eventId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        responseType: "blob",
      }
    );
  },

};

export default reportService;