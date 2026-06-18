import axios from "../api/axios";

const eventService = {

  getEvents: async (token) => {
    return await axios.get("/events", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },

  createEvent: async (data, token) => {
    return await axios.post("/events", data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },

  updateEvent: async (id, data, token) => {
    return await axios.put(`/events/${id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },

  deleteEvent: async (id, token) => {
    return await axios.delete(`/events/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },

};

export default eventService;