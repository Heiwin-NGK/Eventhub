const Attendance = require("../models/Attendance");
const Event = require("../models/Event");
const Registration = require("../models/Registration");
const User = require("../models/User");
const Ticket = require("../models/Ticket");

const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/AppError");

exports.getEventOccupancy = catchAsync(
  async (req, res, next) => {
    const eventId = req.params.eventId;

    const entries =
      await Attendance.countDocuments({
        eventId,
        action: "entry",
      });

    const exits =
      await Attendance.countDocuments({
        eventId,
        action: "exit",
      });

    const currentOccupancy =
      entries - exits;

    res.status(200).json({
      entries,
      exits,
      currentOccupancy,
    });
  }
);

exports.getCapacityStatus = catchAsync(
  async (req, res, next) => {
    const event =
      await Event.findById(
        req.params.eventId
      );

    if (!event) {
      return next(
        new AppError(
          "Event not found",
          404
        )
      );
    }

    const entries =
      await Attendance.countDocuments({
        eventId: event._id,
        action: "entry",
      });

    const exits =
      await Attendance.countDocuments({
        eventId: event._id,
        action: "exit",
      });

    const occupancy =
      entries - exits;

    const percentage =
      (occupancy /
        event.capacity) *
      100;

    res.status(200).json({
      capacity:
        event.capacity,

      occupancy,

      percentage:
        percentage.toFixed(2),
    });
  }
);

exports.getEventStats = catchAsync(
  async (req, res, next) => {
    const eventId =
      req.params.eventId;

    const registrations =
      await Registration.countDocuments({
        eventId,
      });

    const entries =
      await Attendance.countDocuments({
        eventId,
        action: "entry",
      });

    const exits =
      await Attendance.countDocuments({
        eventId,
        action: "exit",
      });

    res.status(200).json({
      registrations,
      entries,
      exits,
      attendanceRate:
        registrations > 0
          ? (
              (entries /
                registrations) *
              100
            ).toFixed(2)
          : 0,
    });
  }
);

exports.getDashboardSummary =
  catchAsync(
    async (
      req,
      res,
      next
    ) => {
      const totalUsers =
        await User.countDocuments();

      const totalEvents =
        await Event.countDocuments();

      const totalRegistrations =
        await Registration.countDocuments();

      const totalTickets =
        await Ticket.countDocuments();

      const totalAttendance =
        await Attendance.countDocuments();

      res.status(200).json({
        totalUsers,
        totalEvents,
        totalRegistrations,
        totalTickets,
        totalAttendance,
      });
    }
  );

exports.getPopularEvents =
  catchAsync(
    async (
      req,
      res,
      next
    ) => {
      const popularEvents =
        await Registration.aggregate([
          {
            $group: {
              _id: "$eventId",
              registrations: {
                $sum: 1,
              },
            },
          },
          {
            $sort: {
              registrations: -1,
            },
          },
          {
            $limit: 5,
          },
        ]);

      res.status(200).json(
        popularEvents
      );
    }
  );

exports.getAttendanceOverview =
  catchAsync(
    async (
      req,
      res,
      next
    ) => {
      const entries =
        await Attendance.countDocuments({
          action: "entry",
        });

      const exits =
        await Attendance.countDocuments({
          action: "exit",
        });

      res.status(200).json({
        entries,
        exits,
        currentOccupancy:
          entries - exits,
      });
    }
  );