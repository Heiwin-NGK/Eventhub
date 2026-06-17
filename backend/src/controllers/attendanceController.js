const Attendance =
  require("../models/Attendance");

const Ticket =
  require("../models/Ticket");

exports.checkIn = async (
  req,
  res
) => {
  try {

    const ticket =
      await Ticket.findOne({
        ticketId:
          req.params.ticketId,
      });

    if (!ticket) {
      return res.status(404).json({
        message:
          "Invalid Ticket",
      });
    }

    const attendance =
      await Attendance.create({
        eventId:
          ticket.eventId,

        userId:
          ticket.userId,

        action:
          "entry",
      });

    res.status(201).json(
      attendance
    );

  } catch (error) {
    res.status(500).json({
      message:
        error.message,
    });
  }
};

exports.checkOut = async (
  req,
  res
) => {
  try {

    const ticket =
      await Ticket.findOne({
        ticketId:
          req.params.ticketId,
      });

    if (!ticket) {
      return res.status(404).json({
        message:
          "Invalid Ticket",
      });
    }

    const attendance =
      await Attendance.create({
        eventId:
          ticket.eventId,

        userId:
          ticket.userId,

        action:
          "exit",
      });

    res.status(201).json(
      attendance
    );

  } catch (error) {
    res.status(500).json({
      message:
        error.message,
    });
  }
};

exports.getAttendanceHistory =
  async (req, res) => {
    try {

      const records =
        await Attendance.find({
          userId:
            req.user._id,
        }).populate(
          "eventId"
        );

      res.status(200).json(
        records
      );

    } catch (error) {
      res.status(500).json({
        message:
          error.message,
      });
    }
  };