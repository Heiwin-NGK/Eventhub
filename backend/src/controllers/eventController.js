const Event = require("../models/Event");
const Registration = require("../models/Registration");
const mongoose = require("mongoose");
const getEventStatus = require("../utils/eventStatus");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/AppError");

exports.createEvent = catchAsync(
  async (req, res, next) => {
    const event = await Event.create({
      ...req.body,
      organizerId: req.user._id,
    });

    res.status(201).json(event);
  }
);
exports.getEvents = catchAsync(
  async (req, res, next) => {
    const {
      search = "",
      type = "All",
      venue = "",
      status = "All",
      sort = "newest",
    } = req.query;

    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 9;
    const skip = (page - 1) * limit;
if (page < 1 || limit < 1) {
  return next(
    new AppError(
      "Invalid pagination values",
      400
    )
  );
}
    let query = {};

    if (search) {
      query.title = {
        $regex: search,
        $options: "i",
      };
    }

    if (type !== "All") {
      query.eventType = type;
    }

    if (venue) {
      query.venue = {
        $regex: venue,
        $options: "i",
      };
    }

    let sortOption = {
      createdAt: -1,
    };

    if (sort === "oldest") {
      sortOption = {
        createdAt: 1,
      };
    }

    const events = await Event.find(query)
      .populate(
        "organizerId",
        "name email"
      )
      .sort(sortOption)
      .skip(skip)
      .limit(limit);

    const filteredEvents =
      events.filter((event) => {
        if (status === "All") {
          return true;
        }

        const now = new Date();
        const start = new Date(
          event.startDate
        );
        const end = new Date(
          event.endDate
        );

        let eventStatus =
          "Upcoming";

        if (now > end) {
          eventStatus =
            "Completed";
        } else if (
          now >= start &&
          now <= end
        ) {
          eventStatus =
            "Ongoing";
        }

        return (
          eventStatus === status
        );
      });

    const totalEvents =
      await Event.countDocuments(
        query
      );

    res.status(200).json({
      events: filteredEvents,
      currentPage: page,
      totalPages: Math.ceil(
        totalEvents / limit
      ),
      totalEvents,
    });
  }
);
exports.getEventById = catchAsync(
  async (req, res, next) => {
    if (
      !mongoose.Types.ObjectId.isValid(
        req.params.id
      )
    ) {
      return next(
        new AppError(
          "Invalid Event ID",
          400
        )
      );
    }

    const event = await Event.findById(
      req.params.id
    ).populate(
      "organizerId",
      "name email role"
    );

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
        eventId: event._id,
      });

    const attendeeRegistered = req.user
      ? await Registration.exists({
          eventId: event._id,
          userId: req.user._id,
        })
      : false;

    const status = getEventStatus(event);

    res.status(200).json({
      ...event.toObject(),
      status,
      registrationCount,
remainingSeats: Math.max(
  0,
  event.capacity - registrationCount
),
      isFull:
        registrationCount >=
        event.capacity,
      attendeeRegistered:
        !!attendeeRegistered,
    });
  }
);
exports.updateEvent = catchAsync(
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

    const event = await Event.findById(
      req.params.id
    );

    if (!event) {
      return next(
        new AppError(
          "Event not found",
          404
        )
      );
    }

    if (
      req.user.role !== "admin" &&
      event.organizerId.toString() !==
        req.user._id.toString()
    ) {
      return next(
        new AppError(
          "You can only edit your own events",
          403
        )
      );
    }

    Object.assign(event, req.body);

    await event.save();

    res.status(200).json(event);
  }
);
exports.deleteEvent = catchAsync(
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

    const event = await Event.findById(
      req.params.id
    );

    if (!event) {
      return next(
        new AppError(
          "Event not found",
          404
        )
      );
    }

    if (
      req.user.role !== "admin" &&
      event.organizerId.toString() !==
        req.user._id.toString()
    ) {
      return next(
        new AppError(
          "You can only delete your own events",
          403
        )
      );
    }

    await event.deleteOne();

    res.status(200).json({
      message:
        "Event deleted successfully",
    });
  }
);