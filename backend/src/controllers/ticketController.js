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
      .populate("eventId")
      .populate("userId", "name email");

    if (!ticket) {
      return res.status(404).json({
        message: "Ticket not found",
      });
    }

    res.status(200).json(ticket);

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
      eventId: ticket.eventId._id,
      userId: ticket.userId._id,
    });

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