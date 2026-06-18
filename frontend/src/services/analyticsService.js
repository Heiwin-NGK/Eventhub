import axios from "../api/axios";

const analyticsService = {

  getDashboard: async (token) => {
    return await axios.get("/analytics/dashboard", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },

};

export default analyticsService;