const express = require("express");

const router = express.Router();

const {
  createEvent,
  getEvents,
  getEventById,
  updateEvent,
  deleteEvent,
} = require("../controllers/eventController");

const {
  protect,
} = require("../middleware/authMiddleware");

router.post("/", protect, createEvent);

router.get("/", getEvents);

router.get("/:id", getEventById);

router.put("/:id", protect, updateEvent);

router.delete("/:id", protect, deleteEvent);

module.exports = router;
