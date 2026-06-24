const Ticket = require("../models/Ticket");
const Registration = require("../models/Registration");

exports.getMyTickets = async (
  req,
  res
) => {
  try {

    const tickets =
      await Ticket.find({
        userId: req.user._id,
      })
        .populate("eventId");

    res.status(200).json(tickets);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
exports.getTicketById = async (req, res) => {
  try {

    const ticket = await Ticket.findById(req.params.id)
      .populate({
        path: "eventId",
        populate: {
          path: "organizerId",
          select: "name email",
        },
      })
      .populate("userId", "name email");

    if (!ticket) {
      return res.status(404).json({
        message: "Ticket not found",
      });
    }

const registration = await Registration.findOne({
  userId: ticket.userId._id,
  eventId: ticket.eventId._id,
}).populate("checkedInBy", "name email");

    res.status(200).json({
      ...ticket.toObject(),
      registrationStatus: registration?.status || "registered",
      registrationDate: registration?.createdAt,
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

exports.verifyTicket = async (req, res) => {
  try {
    const ticket = await Ticket.findOne({
      ticketId: req.params.ticketId,
    })
      .populate("userId", "name email")
      .populate({
        path: "eventId",
        populate: {
          path: "organizerId",
          select: "name email",
        },
      });

    if (!ticket) {
      return res.status(404).json({
        valid: false,
        message: "Ticket not found",
      });
    }

const registration = await Registration.findOne({
  userId: ticket.userId._id,
  eventId: ticket.eventId._id,
}).populate("checkedInBy", "name email");
const registrationCount =
await Registration.countDocuments({
    eventId: ticket.eventId._id,
});

const checkedInCount =
await Registration.countDocuments({
    eventId: ticket.eventId._id,
    status: "checked_in",
});
const capacity = ticket.eventId.capacity;
res.status(200).json({
    valid: true,
    checkedIn:
        registration?.status === "checked_in",
    registrationStatus:
        registration?.status || "registered",
    checkedInAt:
        registration?.checkedInAt,
    checkedInBy:
        registration?.checkedInBy,
    statistics: {
        capacity,
        registered:
            registrationCount,
        checkedIn:
            checkedInCount,
        remaining:
            registrationCount - checkedInCount,
        occupancy:
            Math.round(
                (checkedInCount / capacity) * 100
            ),
    },
    ticket,
});
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.checkInTicket = async (req, res) => {
  try {
    const ticket = await Ticket.findOne({
      ticketId: req.params.ticketId,
    });

    if (!ticket) {
      return res.status(404).json({
        message: "Ticket not found",
      });
    }

const registration = await Registration.findOne({
  userId: ticket.userId._id,
  eventId: ticket.eventId._id,
}).populate("checkedInBy", "name email");

    if (!registration) {
      return res.status(404).json({
        message: "Registration not found",
      });
    }

    if (registration.status === "checked_in") {
      return res.status(400).json({
        message: "Attendee has already checked in",
      });
    }

    registration.status = "checked_in";
    registration.checkedInAt = new Date();
    registration.checkedInBy = req.user._id;

    await registration.save();

    res.status(200).json({
      message: "Check-in successful",
      registration,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
exports.getCheckInHistory = async (req, res) => {
  try {
    const registrations = await Registration.find({
      status: "checked_in",
    })
      .populate("userId", "name email")
      .populate("eventId", "title venue")
      .populate("checkedInBy", "name email")
      .sort({ checkedInAt: -1 });

    res.status(200).json(registrations);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};