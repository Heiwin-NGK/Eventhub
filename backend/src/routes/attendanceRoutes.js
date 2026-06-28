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

/**
 * @swagger
 * /attendance/checkin/{ticketId}:
 *   post:
 *     summary: Check attendee into event
 *     tags:
 *       - Attendance
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: ticketId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       201:
 *         description: Check-in successful
 */
router.post(
  "/checkin/:ticketId",
  protect,
  authorize("admin", "organizer"),
  checkIn
);
/**
 * @swagger
 * /attendance/checkout/{ticketId}:
 *   post:
 *     summary: Check attendee out of event
 *     tags:
 *       - Attendance
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: ticketId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       201:
 *         description: Check-out successful
 */
router.post(
  "/checkout/:ticketId",
  protect,
  authorize("admin", "organizer"),
  checkOut
);
/**
 * @swagger
 * /attendance/history:
 *   get:
 *     summary: Get attendance history
 *     tags:
 *       - Attendance
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Attendance records
 */
router.get(
  "/my",
  protect,
  authorize("admin", "organizer"),
  getAttendanceHistory
);

module.exports = router;