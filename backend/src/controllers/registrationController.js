const Registration = require("../models/Registration");
const Event = require("../models/Event");
const Ticket = require("../models/Ticket");
const QRCode = require("qrcode");
const mongoose = require("mongoose");

exports.registerForEvent = async (req, res) => {
  try {
    const eventId = req.params.eventId;

const event = await Event.findById(eventId);
const registrationCount = await Registration.countDocuments({ eventId });

if (registrationCount >= event.capacity) {
  return res.status(400).json({
    message: "Event is full",
  });
}

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
    
    const ticketId = "TICKET-" + Date.now();
    const qrCode = await QRCode.toDataURL(ticketId);
    const ticket = await Ticket.create({
  ticketId,
  qrCode,
  userId: req.user._id,
  eventId,
});

const updatedCount = await Registration.countDocuments({ eventId });

res.status(201).json({
  registration,
  ticket,
  registrationCount: updatedCount,
  remainingSeats: event.capacity - updatedCount,
  isFull: updatedCount >= event.capacity,
});

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
    const event = await Event.findById(req.params.eventId)
      .populate("organizerId", "name email");

    if (!event) {
      return res.status(404).json({
        message: "Event not found",
      });
    }

const registrations = await Registration.find({
  eventId: req.params.eventId,
})
.populate("userId", "name email")
.lean();

const registrationsWithTickets = await Promise.all(
  registrations.map(async (registration) => {
    const ticket = await Ticket.findOne({
      eventId: registration.eventId,
      userId: registration.userId._id,
    }).select("ticketId");

    return {
      ...registration,
      ticket,
    };
  })
);

    const registrationCount = registrations.length;

    res.status(200).json({
      event: {
        _id: event._id,
        title: event.title,
        description: event.description,
        venue: event.venue,
        eventType: event.eventType,
        startDate: event.startDate,
        endDate: event.endDate,
        status: event.status,
        capacity: event.capacity,
        organizer: event.organizerId,
        registrationCount,
        remainingSeats: event.capacity - registrationCount,
        occupancy: Math.round(
          (registrationCount / event.capacity) * 100
        ),
      },
      registrations: registrationsWithTickets,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.removeRegistration = async (req, res) => {
  try {
    const registration = await Registration.findById(req.params.registrationId);

    if (!registration) {
      return res.status(404).json({
        message: "Registration not found",
      });
    }

    await registration.deleteOne();

    res.status(200).json({
      message: "Registration removed successfully",
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.updateRegistrationStatus = async (req, res) => {
  try {
    const registration = await Registration.findById(req.params.registrationId);

    if (!registration) {
      return res.status(404).json({
        message: "Registration not found",
      });
    }

    registration.status = req.body.status;

    await registration.save();

    res.status(200).json(registration);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};