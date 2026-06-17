const Ticket = require("../models/Ticket");

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
