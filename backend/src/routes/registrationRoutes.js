const express = require("express");
const { authorize } = require("../middleware/roleMiddleware");
const router = express.Router();
const {
  registerForEvent,
  getMyRegistrations,
  getEventRegistrations,
  removeRegistration,
  updateRegistrationStatus,
} = require("../controllers/registrationController");
const {
  protect,
} = require("../middleware/authMiddleware");
const Ticket = require("../models/Ticket");

/**
 * @swagger
 * /registrations/{eventId}:
 *   post:
 *     summary: Register for an event
 *     tags:
 *       - Registrations
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: eventId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       201:
 *         description: Registration successful
 */
router.post(
  "/:eventId",
  protect,
  authorize("attendee"),
  registerForEvent
);
/**
 * @swagger
 * /registrations/my:
 *   get:
 *     summary: Get current user's registrations
 *     tags:
 *       - Registrations
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Registration list
 */
router.get(
  "/my",
  protect,
  getMyRegistrations
);
/**
 * @swagger
 * /registrations/event/{eventId}:
 *   get:
 *     summary: Get registrations for an event
 *     tags:
 *       - Registrations
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
 *         description: Event registrations
 */
router.get(
  "/event/:eventId",
  protect,
  getEventRegistrations
);
/**
 * @swagger
 * /registrations/{registrationId}:
 *   delete:
 *     summary: Remove registration
 *     tags:
 *       - Registrations
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: registrationId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Registration removed
 */
router.delete(
  "/:registrationId",
  protect,
  authorize("admin", "organizer"),
  removeRegistration
);
/**
 * @swagger
 * /registrations/{registrationId}/status:
 *   put:
 *     summary: Update registration status
 *     tags:
 *       - Registrations
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: registrationId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Status updated
 */
router.patch(
  "/:registrationId/status",
  protect,
  authorize("admin", "organizer"),
  updateRegistrationStatus
);

module.exports = router;