const express = require("express");

const router = express.Router();

const {
  getMyTickets,
  getTicketById,
  verifyTicket,
  checkInTicket,
  getCheckInHistory,
} = require("../controllers/ticketController");

const { protect,} = require("../middleware/authMiddleware");

/**
 * @swagger
 * /tickets/my:
 *   get:
 *     summary: Get current user's tickets
 *     tags:
 *       - Tickets
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Ticket list
 */
router.get("/my", protect, getMyTickets);
/**
 * @swagger
 * /tickets/verify/{ticketId}:
 *   get:
 *     summary: Verify ticket
 *     tags:
 *       - Tickets
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: ticketId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Ticket verified
 */
router.get("/verify/:ticketId", protect, verifyTicket);
/**
 * @swagger
 * /tickets/checkin/{ticketId}:
 *   patch:
 *     summary: Check in attendee
 *     tags:
 *       - Tickets
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: ticketId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Check-in successful
 */
router.patch("/checkin/:ticketId", protect, checkInTicket);
/**
 * @swagger
 * /tickets/history:
 *   get:
 *     summary: Check-in history
 *     tags:
 *       - Tickets
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Check-in history
 */
router.get("/history",protect,getCheckInHistory);
/**
 * @swagger
 * /tickets/{id}:
 *   get:
 *     summary: Get ticket details
 *     tags:
 *       - Tickets
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Ticket details
 */
router.get("/:id", protect, getTicketById);

module.exports = router;
