const Event = require("../models/Event");
const mongoose = require("mongoose");

exports.createEvent = async (req, res) => {
  try {
    const event = await Event.create({
      ...req.body,
      organizerId: req.user._id,
    });
    res.status(201).json(event);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.getEvents = async (req, res) => {
  try {
    const events = await Event.find();

    res.status(200).json(events);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.getEventById = async (req, res) => {
  try {

    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        message: "Invalid Event ID"
      });
    }

    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({
        message: "Event not found"
      });
    }

    res.status(200).json(event);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

exports.updateEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({
        message: "Event not found",
      });
    }

    if (
      req.user.role !== "admin" &&
      event.organizerId.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({
        message: "You can only edit your own events",
      });
    }

    Object.assign(event, req.body);

    await event.save();

    res.status(200).json(event);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.deleteEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({
        message: "Event not found",
      });
    }

    if (
      req.user.role !== "admin" &&
      event.organizerId.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({
        message: "You can only delete your own events",
      });
    }

    await event.deleteOne();

    res.status(200).json({
      message: "Event deleted successfully",
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

