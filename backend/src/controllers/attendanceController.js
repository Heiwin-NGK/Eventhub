const Attendance =
  require("../models/Attendance");

const Ticket =
  require("../models/Ticket");

const catchAsync =
  require("../utils/catchAsync");

const AppError =
  require("../utils/AppError");

exports.checkIn = catchAsync(
  async (req, res, next) => {
    const ticket =
      await Ticket.findOne({
        ticketId:
          req.params.ticketId,
      });

    if (!ticket) {
      return next(
        new AppError(
          "Invalid Ticket",
          404
        )
      );
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
  }
);

exports.checkOut = catchAsync(
  async (req, res, next) => {
    const ticket =
      await Ticket.findOne({
        ticketId:
          req.params.ticketId,
      });

    if (!ticket) {
      return next(
        new AppError(
          "Invalid Ticket",
          404
        )
      );
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
  }
);

exports.getAttendanceHistory =
  catchAsync(
    async (
      req,
      res,
      next
    ) => {
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
    }
  );