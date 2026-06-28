const Ticket = require("../models/Ticket");
const Registration = require("../models/Registration");
const mongoose = require("mongoose");

const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/AppError");

exports.getMyTickets = catchAsync(
  async (req, res, next) => {
    const page =
      Number(req.query.page) || 1;

    const limit =
      Number(req.query.limit) || 10;

    const skip =
      (page - 1) * limit;

    const totalTickets =
      await Ticket.countDocuments({
        userId: req.user._id,
      });

    const tickets =
      await Ticket.find({
        userId: req.user._id,
      })
        .populate("eventId")
        .sort({
          createdAt: -1,
        })
        .skip(skip)
        .limit(limit);

    res.status(200).json({
      tickets,
      currentPage: page,
      totalPages: Math.ceil(
        totalTickets / limit
      ),
      totalTickets,
    });
  }
);

exports.getTicketById = catchAsync(
  async (req, res, next) => {
    if (
      !mongoose.Types.ObjectId.isValid(
        req.params.id
      )
    ) {
      return next(
        new AppError(
          "Invalid ID",
          400
        )
      );
    }

    const ticket =
      await Ticket.findById(
        req.params.id
      )
        .populate({
          path: "eventId",
          populate: {
            path: "organizerId",
            select:
              "name email",
          },
        })
        .populate(
          "userId",
          "name email"
        );

    if (!ticket) {
      return next(
        new AppError(
          "Ticket not found",
          404
        )
      );
    }

    const registration =
      await Registration.findOne({
        userId:
          ticket.userId._id,
        eventId:
          ticket.eventId._id,
      }).populate(
        "checkedInBy",
        "name email"
      );

    res.status(200).json({
      ...ticket.toObject(),
      registrationStatus:
        registration?.status ||
        "registered",
      registrationDate:
        registration?.createdAt,
    });
  }
);

exports.verifyTicket = catchAsync(
  async (req, res, next) => {
    const ticket =
      await Ticket.findOne({
        ticketId:
          req.params.ticketId,
      })
        .populate(
          "userId",
          "name email"
        )
        .populate({
          path: "eventId",
          populate: {
            path: "organizerId",
            select:
              "name email",
          },
        });

    if (!ticket) {
      return next(
        new AppError(
          "Ticket not found",
          404
        )
      );
    }

    const registration =
      await Registration.findOne({
        userId:
          ticket.userId._id,
        eventId:
          ticket.eventId._id,
      }).populate(
        "checkedInBy",
        "name email"
      );

    const registrationCount =
      await Registration.countDocuments(
        {
          eventId:
            ticket.eventId._id,
        }
      );

    const checkedInCount =
      await Registration.countDocuments(
        {
          eventId:
            ticket.eventId._id,
          status:
            "checked_in",
        }
      );

    const capacity =
      ticket.eventId.capacity;

    res.status(200).json({
      valid: true,

      checkedIn:
        registration?.status ===
        "checked_in",

      registrationStatus:
        registration?.status ||
        "registered",

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
          registrationCount -
          checkedInCount,

        occupancy:
          Math.round(
            (checkedInCount /
              capacity) *
              100
          ),
      },

      ticket,
    });
  }
);

exports.checkInTicket =
  catchAsync(
    async (
      req,
      res,
      next
    ) => {
      const ticket =
        await Ticket.findOne({
          ticketId:
            req.params.ticketId,
        });

      if (!ticket) {
        return next(
          new AppError(
            "Ticket not found",
            404
          )
        );
      }

      const registration =
        await Registration.findOne(
          {
            userId:
              ticket.userId,
            eventId:
              ticket.eventId,
          }
        );

      if (!registration) {
        return next(
          new AppError(
            "Registration not found",
            404
          )
        );
      }

      if (
        registration.status ===
        "checked_in"
      ) {
        return next(
          new AppError(
            "Attendee has already checked in",
            400
          )
        );
      }

      registration.status =
        "checked_in";

      registration.checkedInAt =
        new Date();

      registration.checkedInBy =
        req.user._id;

      await registration.save();

      res.status(200).json({
        message:
          "Check-in successful",
        registration,
      });
    }
  );

exports.getCheckInHistory =
  catchAsync(
    async (
      req,
      res,
      next
    ) => {
      const page =
        Number(
          req.query.page
        ) || 1;

      const limit =
        Number(
          req.query.limit
        ) || 10;

      const skip =
        (page - 1) * limit;

      const totalRegistrations =
        await Registration.countDocuments(
          {
            status:
              "checked_in",
          }
        );

      const registrations =
        await Registration.find({
          status:
            "checked_in",
        })
          .populate(
            "userId",
            "name email"
          )
          .populate(
            "eventId",
            "title venue"
          )
          .populate(
            "checkedInBy",
            "name email"
          )
          .sort({
            checkedInAt:
              -1,
          })
          .skip(skip)
          .limit(limit);

      res.status(200).json({
        registrations,
        currentPage:
          page,
        totalPages:
          Math.ceil(
            totalRegistrations /
              limit
          ),
        totalRegistrations,
      });
    }
  );