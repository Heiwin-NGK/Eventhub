const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema(
  {

    qrCode: {
        type: String,
    },
    ticketId: {
      type: String,
      required: true,
      unique: true,
    },

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    eventId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
      required: true,
    },

    issuedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);
ticketSchema.index({
  userId: 1,
});

ticketSchema.index({
  eventId: 1,
});

module.exports = mongoose.model(
  "Ticket",
  ticketSchema
);