const Registration = require("../models/Registration");
const Event = require("../models/Event");
const Ticket = require("../models/Ticket");

exports.registerForEvent = async (req, res) => {
  try {
    const eventId = req.params.eventId;

    const event = await Event.findById(eventId);

    if (!event) {
      return res.status(404).json({
        message: "Event not found",
      });
    }

    const existingRegistration =
      await Registration.findOne({
        userId: req.user._id,
        eventId,
      });

    if (existingRegistration) {
      return res.status(400).json({
        message: "Already registered",
      });
    }

    const registration =
      await Registration.create({
        userId: req.user._id,
        eventId,
      });
    
    const ticket = await Ticket.create({
  ticketId:
    "TICKET-" +
    Date.now(),

  userId: req.user._id,

  eventId,
});

    res.status(201).json({ registration, ticket });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.getMyRegistrations = async (req, res) => {
  try {

    const registrations =
      await Registration.find({
        userId: req.user._id,
      }).populate("eventId");

    res.status(200).json(registrations);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.getEventRegistrations = async (req, res) => {
  try {

    const registrations =
      await Registration.find({
        eventId: req.params.eventId,
      }).populate("userId", "name email");

    res.status(200).json(registrations);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};