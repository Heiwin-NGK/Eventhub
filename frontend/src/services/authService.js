import axios from "../api/axios";

const authService = {

  login: async (data) => {
    return await axios.post("/auth/login", data);
  },

  register: async (data) => {
    return await axios.post("/auth/register", data);
  },

  getCurrentUser: async (token) => {
    return await axios.get("/auth/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },

};

export default authService;