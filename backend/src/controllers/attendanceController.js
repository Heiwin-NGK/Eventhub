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
console.log(ticket.userId);
    if (!ticket) {
      return next(
        new AppError(
          "Invalid Ticket",
          404
        )
      );
    }

    const lastRecord =
      await Attendance.findOne({
        userId: ticket.userId,
        eventId: ticket.eventId,
      }).sort({ createdAt: -1 });

    if (
      lastRecord &&
      lastRecord.action === "entry"
    ) {
      return next(
        new AppError(
          "Already checked in",
          400
        )
      );
    }

    const attendance =
      await Attendance.create({
        eventId:
          ticket.eventId,
        userId:
          ticket.userId,
        action: "entry",
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

    const lastRecord =
      await Attendance.findOne({
        userId: ticket.userId,
        eventId: ticket.eventId,
      }).sort({ createdAt: -1 });

    if (
      !lastRecord ||
      lastRecord.action === "exit"
    ) {
      return next(
        new AppError(
          "User is not checked in",
          400
        )
      );
    }

    const attendance =
      await Attendance.create({
        eventId:
          ticket.eventId,
        userId:
          ticket.userId,
        action: "exit",
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
console.log(req.user._id);
      res.status(200).json(
        records
      );
    }
  );