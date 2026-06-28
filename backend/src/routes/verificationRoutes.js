const express = require("express");

const router = express.Router();

const {
  verifyTicket,
} = require(
  "../controllers/verificationController"
);

const {
  protect,
} = require(
  "../middleware/authMiddleware"
);

/**
 * @swagger
 * /verification/{ticketId}:
 *   get:
 *     summary: Verify ticket QR code
 *     tags:
 *       - Verification
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
 *       404:
 *         description: Invalid ticket
 */
router.get(
  "/:ticketId",
  protect,
  verifyTicket
);

module.exports = router;