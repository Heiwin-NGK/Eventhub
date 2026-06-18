const express = require("express");
const { authorize } = require("../middleware/roleMiddleware");
const router = express.Router();
const {
  getRegistrationReport,
  getAttendanceReport,
  exportRegistrationsCSV,
} = require(
  "../controllers/reportController"
);
const {
  protect,
} = require(
  "../middleware/authMiddleware"
);

router.get(
  "/registrations/:eventId",
  protect,
  authorize("admin", "organizer"),
  getRegistrationReport
);

router.get(
  "/attendance/:eventId",
  protect,
  authorize("admin", "organizer"),
  getAttendanceReport
);

router.get(
  "/registrations-csv/:eventId",
  protect,
  authorize("admin", "organizer"),
  exportRegistrationsCSV
);

module.exports = router;