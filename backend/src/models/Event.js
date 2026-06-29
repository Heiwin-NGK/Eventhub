const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    eventType: {
      type: String,
      required: true,
    },

    venue: {
      type: String,
      required: true,
    },

    startDate: {
      type: Date,
      required: true,
    },

    endDate: {
      type: Date,
      required: true,
    },

    capacity: {
      type: Number,
      required: true,
    },

    organizerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    status: {
      type: String,
      default: "Upcoming",
    },
  },
  {
    timestamps: true,
  }
);
eventSchema.index({ title: 1 });
eventSchema.index({ eventType: 1 });
eventSchema.index({ venue: 1 });
eventSchema.index({ startDate: 1 });
eventSchema.index({ organizerId: 1, startDate: -1, });

module.exports = mongoose.model("Event", eventSchema);