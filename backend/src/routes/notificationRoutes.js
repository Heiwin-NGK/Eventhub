const express = require("express");

const router = express.Router();

const {
  createNotification,
  getMyNotifications,
  markAsRead,
} = require(
  "../controllers/notificationController"
);

const {
  protect,
} = require(
  "../middleware/authMiddleware"
);

router.post(
  "/",
  protect,
  createNotification
);

router.get(
  "/my",
  protect,
  getMyNotifications
);

router.put(
  "/read/:id",
  protect,
  markAsRead
);

module.exports = router;