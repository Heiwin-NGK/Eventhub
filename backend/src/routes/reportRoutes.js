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

/**
 * @swagger
 * /reports/registrations/{eventId}:
 *   get:
 *     summary: Get registration report
 *     tags:
 *       - Reports
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
 *         description: Registration report
 */
router.get(
  "/registrations/:eventId",
  protect,
  authorize("admin", "organizer"),
  getRegistrationReport
);
/**
 * @swagger
 * /reports/attendance/{eventId}:
 *   get:
 *     summary: Get attendance report
 *     tags:
 *       - Reports
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
 *         description: Attendance report
 */
router.get(
  "/attendance/:eventId",
  protect,
  authorize("admin", "organizer"),
  getAttendanceReport
);
/**
 * @swagger
 * /reports/export/{eventId}:
 *   get:
 *     summary: Export registrations CSV
 *     tags:
 *       - Reports
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
 *         description: CSV exported
 */
router.get(
  "/registrations-csv/:eventId",
  protect,
  authorize("admin", "organizer"),
  exportRegistrationsCSV
);

module.exports = router;