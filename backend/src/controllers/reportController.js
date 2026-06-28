const { Parser } = require("json2csv");

const Event = require("../models/Event");
const Registration = require("../models/Registration");
const Attendance = require("../models/Attendance");

const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/AppError");

exports.getRegistrationReport =
  catchAsync(
    async (
      req,
      res,
      next
    ) => {
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

      const registrations =
        await Registration.find({
          eventId:
            req.params.eventId,
        }).populate(
          "userId",
          "name email"
        );

      res.status(200).json(
        registrations
      );
    }
  );

exports.getAttendanceReport =
  catchAsync(
    async (
      req,
      res,
      next
    ) => {
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

      const attendance =
        await Attendance.find({
          eventId:
            req.params.eventId,
        }).populate(
          "userId",
          "name email"
        );

      res.status(200).json(
        attendance
      );
    }
  );

exports.exportRegistrationsCSV =
  catchAsync(
    async (
      req,
      res,
      next
    ) => {
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

      const registrations =
        await Registration.find({
          eventId:
            req.params.eventId,
        }).populate(
          "userId",
          "name email"
        );

      const data =
        registrations.map(
          (r) => ({
            name:
              r.userId?.name ||
              "N/A",

            email:
              r.userId?.email ||
              "N/A",

            status:
              r.status,
          })
        );

      const parser =
        new Parser();

      const csv =
        parser.parse(data);

      res.header(
        "Content-Type",
        "text/csv"
      );

      res.attachment(
        "registrations.csv"
      );

      res.status(200).send(
        csv
      );
    }
  );