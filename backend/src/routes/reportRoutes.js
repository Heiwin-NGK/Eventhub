const express = require("express");

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
  getRegistrationReport
);

router.get(
  "/attendance/:eventId",
  protect,
  getAttendanceReport
);

router.get(
  "/registrations-csv/:eventId",
  protect,
  exportRegistrationsCSV
);

module.exports = router;