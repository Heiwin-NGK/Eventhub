const express = require("express");

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
  checkIn
);

router.post(
  "/checkout/:ticketId",
  protect,
  checkOut
);

router.get(
  "/my",
  protect,
  getAttendanceHistory
);

module.exports = router;