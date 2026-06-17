const Attendance = require("../models/Attendance");
const Event = require("../models/Event");
const Registration = require("../models/Registration");
const User = require("../models/User");
const Ticket = require("../models/Ticket");

exports.getEventOccupancy = async (req, res) => {
  try {

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

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.getCapacityStatus =
  async (req, res) => {
    try {

      const event =
        await Event.findById(
          req.params.eventId
        );

      if (!event) {
        return res.status(404).json({
          message: "Event not found",
        });
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
        (
          occupancy /
          event.capacity
        ) * 100;

      res.status(200).json({
        capacity:
          event.capacity,

        occupancy,

        percentage:
          percentage.toFixed(2),
      });

    } catch (error) {
      res.status(500).json({
        message:
          error.message,
      });
    }
  };

  exports.getEventStats =
  async (req, res) => {
    try {

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
          registrations
            ? (
                (entries /
                  registrations) *
                100
              ).toFixed(2)
            : 0,
      });

    } catch (error) {
      res.status(500).json({
        message:
          error.message,
      });
    }
  };

  exports.getDashboardSummary = async (req, res) => {
  try {

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

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.getPopularEvents = async (req, res) => {
  try {

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

  } catch (error) {
    res.status(500).json({
      message:
        error.message,
    });
  }
};

exports.getAttendanceOverview =
  async (req, res) => {
    try {

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

    } catch (error) {
      res.status(500).json({
        message:
          error.message,
      });
    }
  };

  