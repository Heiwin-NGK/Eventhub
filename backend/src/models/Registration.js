const mongoose = require("mongoose");

const registrationSchema = new mongoose.Schema(
  {
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

    status: {
      type: String,
      default: "registered",
    },

    checkedInAt: {
      type: Date,
      default: null,
    },

    checkedInBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
  },
  {
    timestamps: true,
  }
);
registrationSchema.index({
  userId: 1,
  eventId: 1,
});

registrationSchema.index({
  eventId: 1,
});

registrationSchema.index({
  status: 1,
});

registrationSchema.index({
  checkedInAt: -1,
});
module.exports = mongoose.model(
  "Registration",
  registrationSchema
);