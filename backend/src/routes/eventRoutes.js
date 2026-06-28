const { authorize } = require("../middleware/roleMiddleware");
const express = require("express");
const router = express.Router();
const {
  createEvent,
  getEvents,
  getEventById,
  updateEvent,
  deleteEvent,
} = require("../controllers/eventController");
const {
  protect,
} = require("../middleware/authMiddleware");
/**
 * @swagger
 * /events:
 *   get:
 *     summary: Get all events
 *     tags:
 *       - Events
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of events
 */
router.get("/", getEvents);
/**
 * @swagger
 * /events/{id}:
 *   get:
 *     summary: Get event details
 *     tags:
 *       - Events
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Event details
 *       404:
 *         description: Event not found
 */
router.get("/:id", protect, getEventById);
/**
 * @swagger
 * /events:
 *   post:
 *     summary: Create event
 *     tags:
 *       - Events
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Event'
 *     responses:
 *       201:
 *         description: Event created
 */
router.post(
  "/",
  protect,
  authorize("admin", "organizer"),
  createEvent
);
/**
 * @swagger
 * /events/{id}:
 *   put:
 *     summary: Update event
 *     tags:
 *       - Events
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
 *         description: Event updated
 */
router.put(
  "/:id",
  protect,
  authorize("admin", "organizer"),
  updateEvent
);
/**
 * @swagger
 * /events/{id}:
 *   delete:
 *     summary: Delete event
 *     tags:
 *       - Events
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
 *         description: Event deleted
 */
router.delete(
  "/:id",
  protect,
  authorize("admin", "organizer"),
  deleteEvent
);
module.exports = router;
