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

/**
 * @swagger
 * /notifications:
 *   post:
 *     summary: Create notification
 *     tags:
 *       - Notifications
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Notification created
 */
router.post(
  "/",
  protect,
  authorize("admin", "organizer"),
  createNotification
);
/**
 * @swagger
 * /notifications/my:
 *   get:
 *     summary: Get current user's notifications
 *     tags:
 *       - Notifications
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Notification list
 */
router.get(
  "/my",
  protect,
  getMyNotifications
);
/**
 * @swagger
 * /notifications/{id}/read:
 *   put:
 *     summary: Mark notification as read
 *     tags:
 *       - Notifications
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
 *         description: Notification updated
 */
router.put(
  "/read/:id",
  protect,
  markAsRead
);

module.exports = router;