const Ticket = require("../models/Ticket");

const catchAsync =
  require("../utils/catchAsync");

const AppError =
  require("../utils/AppError");

exports.verifyTicket =
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
            "Invalid Ticket",
            404
          )
        );
      }

      res.status(200).json({
        message:
          "Ticket Verified",

        ticket,
      });
    }
  );