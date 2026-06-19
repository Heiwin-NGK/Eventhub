const { authorize } = require("../middleware/roleMiddleware");
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
router.get("/", getEvents);
router.get("/:id", protect, getEventById);
router.post(
  "/",
  protect,
  authorize("admin", "organizer"),
  createEvent
);
router.put(
  "/:id",
  protect,
  authorize("admin", "organizer"),
  updateEvent
);
router.delete(
  "/:id",
  protect,
  authorize("admin", "organizer"),
  deleteEvent
);
module.exports = router;
