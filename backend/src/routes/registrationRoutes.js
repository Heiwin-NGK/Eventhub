const express = require("express");
const { authorize } = require("../middleware/roleMiddleware");
const router = express.Router();
const {
  registerForEvent,
  getMyRegistrations,
  getEventRegistrations,
  removeRegistration,
  updateRegistrationStatus,
} = require("../controllers/registrationController");
const {
  protect,
} = require("../middleware/authMiddleware");
const Ticket = require("../models/Ticket");

router.post(
  "/:eventId",
  protect,
  authorize("attendee"),
  registerForEvent
);

router.get(
  "/my",
  protect,
  getMyRegistrations
);

router.get(
  "/:eventId",
  protect,
  getEventRegistrations
);

router.get(
  "/event/:eventId",
  protect,
  getEventRegistrations
);

router.delete(
  "/:registrationId",
  protect,
  authorize("admin", "organizer"),
  removeRegistration
);

router.patch(
  "/:registrationId/status",
  protect,
  authorize("admin", "organizer"),
  updateRegistrationStatus
);

module.exports = router;