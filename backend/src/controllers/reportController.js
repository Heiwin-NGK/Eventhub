const { Parser } = require("json2csv");

const Event = require("../models/Event");
const Registration = require("../models/Registration");
const Attendance = require("../models/Attendance");

exports.getRegistrationReport =
  async (req, res) => {
    try {

      const registrations =
        await Registration.find({
          eventId:
            req.params.eventId,
        })
          .populate(
            "userId",
            "name email"
          );

      res.status(200).json(
        registrations
      );

    } catch (error) {
      res.status(500).json({
        message:
          error.message,
      });
    }
  };

  exports.getAttendanceReport =
  async (req, res) => {
    try {

      const attendance =
        await Attendance.find({
          eventId:
            req.params.eventId,
        })
          .populate(
            "userId",
            "name email"
          );

      res.status(200).json(
        attendance
      );

    } catch (error) {
      res.status(500).json({
        message:
          error.message,
      });
    }
  };

  exports.exportRegistrationsCSV =
  async (req, res) => {
    try {

      const registrations =
        await Registration.find({
          eventId:
            req.params.eventId,
        })
          .populate(
            "userId",
            "name email"
          );

      const data =
        registrations.map(
          (r) => ({
            name:
              r.userId.name,

            email:
              r.userId.email,

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

      return res.send(csv);

    } catch (error) {
      res.status(500).json({
        message:
          error.message,
      });
    }
  };

  