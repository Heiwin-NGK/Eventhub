const Registration = require("../models/Registration");
const Event = require("../models/Event");
const Ticket = require("../models/Ticket");
const QRCode = require("qrcode");
const mongoose = require("mongoose");

const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/AppError");

exports.registerForEvent = catchAsync(
  async (req, res, next) => {
    const eventId = req.params.eventId;

    if (
      !mongoose.Types.ObjectId.isValid(
        eventId
      )
    ) {
      return next(
        new AppError(
          "Invalid Event ID",
          400
        )
      );
    }

    const event =
      await Event.findById(eventId);

    if (!event) {
      return next(
        new AppError(
          "Event not found",
          404
        )
      );
    }

    const registrationCount =
      await Registration.countDocuments({
        eventId,
      });

    if (
      registrationCount >=
      event.capacity
    ) {
      return next(
        new AppError(
          "Event is full",
          400
        )
      );
    }

    const existingRegistration =
      await Registration.findOne({
        userId: req.user._id,
        eventId,
      });

    if (
      existingRegistration
    ) {
      return next(
        new AppError(
          "Already registered",
          400
        )
      );
    }

    const registration =
      await Registration.create({
        userId: req.user._id,
        eventId,
      });

    const ticketId =
      "TICKET-" + Date.now();

    const qrCode =
      await QRCode.toDataURL(
        ticketId
      );

    const ticket =
      await Ticket.create({
        ticketId,
        qrCode,
        userId:
          req.user._id,
        eventId,
      });

    const updatedCount =
      await Registration.countDocuments(
        {
          eventId,
        }
      );

    res.status(201).json({
      registration,
      ticket,
      registrationCount:
        updatedCount,
      remainingSeats:
        Math.max(
          0,
          event.capacity -
            updatedCount
        ),
      isFull:
        updatedCount >=
        event.capacity,
    });
  }
);

exports.getMyRegistrations =
  catchAsync(
    async (
      req,
      res,
      next
    ) => {
      const registrations =
        await Registration.find({
          userId:
            req.user._id,
        }).populate(
          "eventId"
        );

      res.status(200).json(
        registrations
      );
    }
  );

exports.getEventRegistrations =
  catchAsync(
    async (
      req,
      res,
      next
    ) => {
      const event =
        await Event.findById(
          req.params.eventId
        ).populate(
          "organizerId",
          "name email"
        );

      if (!event) {
        return next(
          new AppError(
            "Event not found",
            404
          )
        );
      }

      const registrations =
        await Registration.find({
          eventId:
            req.params.eventId,
        })
          .populate(
            "userId",
            "name email"
          )
          .lean();

      const registrationsWithTickets =
        await Promise.all(
          registrations.map(
            async (
              registration
            ) => {
              const ticket =
                await Ticket.findOne(
                  {
                    eventId:
                      registration.eventId,
                    userId:
                      registration
                        .userId
                        ._id,
                  }
                ).select(
                  "ticketId"
                );

              return {
                ...registration,
                ticket,
              };
            }
          )
        );

      const registrationCount =
        registrations.length;

      res.status(200).json({
        event: {
          _id: event._id,
          title:
            event.title,
          description:
            event.description,
          venue:
            event.venue,
          eventType:
            event.eventType,
          startDate:
            event.startDate,
          endDate:
            event.endDate,
          status:
            event.status,
          capacity:
            event.capacity,
          organizer:
            event.organizerId,
          registrationCount,
          remainingSeats:
            Math.max(
              0,
              event.capacity -
                registrationCount
            ),
          occupancy:
            Math.round(
              (registrationCount /
                event.capacity) *
                100
            ),
        },
        registrations:
          registrationsWithTickets,
      });
    }
  );

exports.removeRegistration =
  catchAsync(
    async (
      req,
      res,
      next
    ) => {
      const registration =
        await Registration.findById(
          req.params
            .registrationId
        );

      if (
        !registration
      ) {
        return next(
          new AppError(
            "Registration not found",
            404
          )
        );
      }

      await Ticket.deleteOne({
        eventId:
          registration.eventId,
        userId:
          registration.userId,
      });

      await registration.deleteOne();

      res.status(200).json({
        message:
          "Registration removed successfully",
      });
    }
  );

exports.updateRegistrationStatus =
  catchAsync(
    async (
      req,
      res,
      next
    ) => {
      const registration =
        await Registration.findById(
          req.params
            .registrationId
        );

      if (
        !registration
      ) {
        return next(
          new AppError(
            "Registration not found",
            404
          )
        );
      }

      registration.status =
        req.body.status;

      await registration.save();

      res.status(200).json(
        registration
      );
    }
  );