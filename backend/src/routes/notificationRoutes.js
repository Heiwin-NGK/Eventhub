const express = require("express");
const { authorize } = require("../middleware/roleMiddleware");
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
  authorize("admin", "organizer"),
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