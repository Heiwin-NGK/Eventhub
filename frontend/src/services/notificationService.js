import axios from "../api/axios";

const notificationService = {

  getNotifications: async (token) => {
    return await axios.get("/notifications/my", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },

  markAsRead: async (id, token) => {
    return await axios.put(
      `/notifications/read/${id}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  },

};

export default notificationService;