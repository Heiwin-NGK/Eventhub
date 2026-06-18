const express = require("express");
const { authorize } = require("../middleware/roleMiddleware");
const router = express.Router();
const {
  checkIn,
  checkOut,
  getAttendanceHistory,
} = require(
  "../controllers/attendanceController"
);
const {
  protect,
} = require(
  "../middleware/authMiddleware"
);

router.post(
  "/checkin/:ticketId",
  protect,
  authorize("admin", "organizer"),
  checkIn
);

router.post(
  "/checkout/:ticketId",
  protect,
  authorize("admin", "organizer"),
  checkOut
);

router.get(
  "/my",
  protect,
  authorize("admin", "organizer"),
  getAttendanceHistory
);

module.exports = router;