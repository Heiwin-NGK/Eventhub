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

router.get("/my", protect, getMyTickets);

router.get("/verify/:ticketId", protect, verifyTicket);

router.patch("/checkin/:ticketId", protect, checkInTicket);

router.get("/history",protect,getCheckInHistory);

router.get("/:id", protect, getTicketById);

module.exports = router;
