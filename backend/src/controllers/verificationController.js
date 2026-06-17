const Ticket = require("../models/Ticket");

exports.verifyTicket =
  async (req, res) => {
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

      res.status(200).json({
        message:
          "Ticket Verified",

        ticket,
      });

    } catch (error) {
      res.status(500).json({
        message:
          error.message,
      });
    }
  };