const express = require("express");

const router = express.Router();

const {
  getEventOccupancy,
  getCapacityStatus,
  getEventStats,
  getDashboardSummary,
  getPopularEvents,
  getAttendanceOverview
} = require(
  "../controllers/analyticsController"
);

const {
  protect,
} = require(
  "../middleware/authMiddleware"
);

router.get(
  "/occupancy/:eventId",
  protect,
  getEventOccupancy
);

router.get(
  "/capacity/:eventId",
  protect,
  getCapacityStatus
);

router.get(
  "/stats/:eventId",
  protect,
  getEventStats
);

router.get(
  "/dashboard",
  protect,
  getDashboardSummary
);

router.get(
  "/popular-events",
  protect,
  getPopularEvents
);

router.get(
  "/attendance-overview",
  protect,
  getAttendanceOverview
);

module.exports = router;