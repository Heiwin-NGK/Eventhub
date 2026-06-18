const express = require("express");
const { authorize } = require("../middleware/roleMiddleware");
const router = express.Router();
const {
  registerForEvent,
  getMyRegistrations,
  getEventRegistrations,
} = require("../controllers/registrationController");
const {
  protect,
} = require("../middleware/authMiddleware");

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


module.exports = router;