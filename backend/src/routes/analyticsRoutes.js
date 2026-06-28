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

/**
 * @swagger
 * /analytics/occupancy/{eventId}:
 *   get:
 *     summary: Get event occupancy
 *     tags:
 *       - Analytics
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: eventId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Occupancy statistics
 */
router.get(
  "/occupancy/:eventId",
  protect,
  authorize("admin", "organizer"),
  getEventOccupancy
);
/**
 * @swagger
 * /analytics/capacity/{eventId}:
 *   get:
 *     summary: Get event capacity utilization
 *     tags:
 *       - Analytics
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: eventId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Capacity statistics
 */
router.get(
  "/capacity/:eventId",
  protect,
  authorize("admin", "organizer"),
  getCapacityStatus
);
/**
 * @swagger
 * /analytics/event-stats/{eventId}:
 *   get:
 *     summary: Get detailed event statistics
 *     tags:
 *       - Analytics
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: eventId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Event statistics
 */
router.get(
  "/stats/:eventId",
  protect,
  authorize("admin", "organizer"),
  getEventStats
);
/**
 * @swagger
 * /analytics/dashboard:
 *   get:
 *     summary: Get dashboard summary
 *     tags:
 *       - Analytics
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Dashboard metrics
 */
router.get(
  "/dashboard",
  protect,
  authorize("admin", "organizer"),
  getDashboardSummary
);
/**
 * @swagger
 * /analytics/popular-events:
 *   get:
 *     summary: Get most popular events
 *     tags:
 *       - Analytics
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Popular events list
 */
router.get(
  "/popular-events",
  protect,
  authorize("admin", "organizer"),
  getPopularEvents
);
/**
 * @swagger
 * /analytics/attendance-overview:
 *   get:
 *     summary: Get attendance overview
 *     tags:
 *       - Analytics
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Attendance summary
 */
router.get(
  "/attendance-overview",
  protect,
  authorize("admin", "organizer"),
  getAttendanceOverview
);

module.exports = router;