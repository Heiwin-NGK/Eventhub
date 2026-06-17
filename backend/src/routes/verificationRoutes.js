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

router.get(
  "/:ticketId",
  protect,
  verifyTicket
);

module.exports = router;