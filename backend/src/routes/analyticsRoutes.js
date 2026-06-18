const { authorize } = require("../middleware/roleMiddleware");
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
  authorize("admin", "organizer"),
  getEventOccupancy
);

router.get(
  "/capacity/:eventId",
  protect,
  authorize("admin", "organizer"),
  getCapacityStatus
);

router.get(
  "/stats/:eventId",
  protect,
  authorize("admin", "organizer"),
  getEventStats
);

router.get(
  "/dashboard",
  protect,
  authorize("admin", "organizer"),
  getDashboardSummary
);

router.get(
  "/popular-events",
  protect,
  authorize("admin", "organizer"),
  getPopularEvents
);

router.get(
  "/attendance-overview",
  protect,
  authorize("admin", "organizer"),
  getAttendanceOverview
);

module.exports = router;