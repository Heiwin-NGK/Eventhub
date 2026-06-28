# Controllers Copy

Combined copy of the controller source files from `backend/src/controllers`.

## analyticsController.js

```javascript
const Attendance = require("../models/Attendance");
const Event = require("../models/Event");
const Registration = require("../models/Registration");
const User = require("../models/User");
const Ticket = require("../models/Ticket");

exports.getEventOccupancy = async (req, res) => {
  try {

    const eventId = req.params.eventId;

    const entries =
      await Attendance.countDocuments({
        eventId,
        action: "entry",
      });

    const exits =
      await Attendance.countDocuments({
        eventId,
        action: "exit",
      });

    const currentOccupancy =
      entries - exits;

    res.status(200).json({
      entries,
      exits,
      currentOccupancy,
    });

  } catch (error) {
res.status(500).json({
  message:
    process.env.NODE_ENV === "development"
      ? error.message
      : "Internal Server Error",
});
  }
};

exports.getCapacityStatus =
  async (req, res) => {
    try {

      const event =
        await Event.findById(
          req.params.eventId
        );

      if (!event) {
        return res.status(404).json({
          message: "Event not found",
        });
      }

      const entries =
        await Attendance.countDocuments({
          eventId: event._id,
          action: "entry",
        });

      const exits =
        await Attendance.countDocuments({
          eventId: event._id,
          action: "exit",
        });

      const occupancy =
        entries - exits;

      const percentage =
        (
          occupancy /
          event.capacity
        ) * 100;

      res.status(200).json({
        capacity:
          event.capacity,

        occupancy,

        percentage:
          percentage.toFixed(2),
      });

    } catch (error) {
res.status(500).json({
  message:
    process.env.NODE_ENV === "development"
      ? error.message
      : "Internal Server Error",
});
    }
  };

  exports.getEventStats =
  async (req, res) => {
    try {

      const eventId =
        req.params.eventId;

      const registrations =
        await Registration.countDocuments({
          eventId,
        });

      const entries =
        await Attendance.countDocuments({
          eventId,
          action: "entry",
        });

      const exits =
        await Attendance.countDocuments({
          eventId,
          action: "exit",
        });

      res.status(200).json({
        registrations,
        entries,
        exits,
        attendanceRate:
          registrations
            ? (
                (entries /
                  registrations) *
                100
              ).toFixed(2)
            : 0,
      });

    } catch (error) {
res.status(500).json({
  message:
    process.env.NODE_ENV === "development"
      ? error.message
      : "Internal Server Error",
});
    }
  };

  exports.getDashboardSummary = async (req, res) => {
  try {

    const totalUsers =
      await User.countDocuments();

    const totalEvents =
      await Event.countDocuments();

    const totalRegistrations =
      await Registration.countDocuments();

    const totalTickets =
      await Ticket.countDocuments();

    const totalAttendance =
      await Attendance.countDocuments();

    res.status(200).json({
      totalUsers,
      totalEvents,
      totalRegistrations,
      totalTickets,
      totalAttendance,
    });

  } catch (error) {
res.status(500).json({
  message:
    process.env.NODE_ENV === "development"
      ? error.message
      : "Internal Server Error",
});
  }
};

exports.getPopularEvents = async (req, res) => {
  try {

    const popularEvents =
      await Registration.aggregate([
        {
          $group: {
            _id: "$eventId",
            registrations: {
              $sum: 1,
            },
          },
        },

        {
          $sort: {
            registrations: -1,
          },
        },

        {
          $limit: 5,
        },
      ]);

    res.status(200).json(
      popularEvents
    );

  } catch (error) {
res.status(500).json({
  message:
    process.env.NODE_ENV === "development"
      ? error.message
      : "Internal Server Error",
});
  }
};

exports.getAttendanceOverview =
  async (req, res) => {
    try {

      const entries =
        await Attendance.countDocuments({
          action: "entry",
        });

      const exits =
        await Attendance.countDocuments({
          action: "exit",
        });

      res.status(200).json({
        entries,
        exits,
        currentOccupancy:
          entries - exits,
      });

    } catch (error) {
res.status(500).json({
  message:
    process.env.NODE_ENV === "development"
      ? error.message
      : "Internal Server Error",
});
    }
  };

  
```

## attendanceController.js

```javascript
const Attendance =
  require("../models/Attendance");

const Ticket =
  require("../models/Ticket");

exports.checkIn = async (
  req,
  res
) => {
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

    const attendance =
      await Attendance.create({
        eventId:
          ticket.eventId,

        userId:
          ticket.userId,

        action:
          "entry",
      });

    res.status(201).json(
      attendance
    );

  } catch (error) {
res.status(500).json({
  message:
    process.env.NODE_ENV === "development"
      ? error.message
      : "Internal Server Error",
});
  }
};

exports.checkOut = async (
  req,
  res
) => {
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

    const attendance =
      await Attendance.create({
        eventId:
          ticket.eventId,

        userId:
          ticket.userId,

        action:
          "exit",
      });

    res.status(201).json(
      attendance
    );

  } catch (error) {
res.status(500).json({
  message:
    process.env.NODE_ENV === "development"
      ? error.message
      : "Internal Server Error",
});
  }
};

exports.getAttendanceHistory =
  async (req, res) => {
    try {

      const records =
        await Attendance.find({
          userId:
            req.user._id,
        }).populate(
          "eventId"
        );

      res.status(200).json(
        records
      );

    } catch (error) {
res.status(500).json({
  message:
    process.env.NODE_ENV === "development"
      ? error.message
      : "Internal Server Error",
});
    }
  };
```

## authController.js

```javascript
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      message: "User registered successfully",
      user: {
       id: user._id,
       name: user.name,
       email: user.email,
       role: user.role,
  },
});
  } catch (error) {
res.status(500).json({
  message:
    process.env.NODE_ENV === "development"
      ? error.message
      : "Internal Server Error",
});
  }
};
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return res.status(400).json({
        message: "Invalid credentials",
      });
    }

    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid credentials",
      });
    }
    
    console.log("JWT_SECRET =", process.env.JWT_SECRET);
    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });

  } catch (error) {
res.status(500).json({
  message:
    process.env.NODE_ENV === "development"
      ? error.message
      : "Internal Server Error",
});
  }
};

exports.getMe = async (req, res) => {
  console.log("req.user =", req.user);

  return res.status(200).json(req.user);
};
```

## eventController.js

```javascript
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

exports.getEventById = async (req, res) => {
  try {
    if (
      !mongoose.Types.ObjectId.isValid(
        req.params.id
      )
    ) {
      return res.status(400).json({
        message: "Invalid Event ID",
      });
    }
const event = await Event.findById(req.params.id).populate(
  "organizerId",
  "name email role"
);
    if (!event) {
      return res.status(404).json({
        message: "Event not found",
      });
    }
const registrationCount = await Registration.countDocuments({
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
  remainingSeats: event.capacity - registrationCount,
  isFull: registrationCount >= event.capacity,
  attendeeRegistered: !!attendeeRegistered,
});

  } catch (error) {
res.status(500).json({
  message:
    process.env.NODE_ENV === "development"
      ? error.message
      : "Internal Server Error",
});
  }
};

exports.updateEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

if (
  !mongoose.Types.ObjectId.isValid(
    req.params.id
  )
) {
  return res.status(400).json({
    message: "Invalid ID",
  });
}
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
  message:
    process.env.NODE_ENV === "development"
      ? error.message
      : "Internal Server Error",
});
  }
};

exports.deleteEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
if (
  !mongoose.Types.ObjectId.isValid(
    req.params.id
  )
) {
  return res.status(400).json({
    message: "Invalid ID",
  });
}
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
  message:
    process.env.NODE_ENV === "development"
      ? error.message
      : "Internal Server Error",
});
  }
};
```

## notificationController.js

```javascript
const Notification = require("../models/Notification");

exports.createNotification =
  async (req, res) => {
    try {

      const notification =
        await Notification.create(
          req.body
        );

      res.status(201).json(
        notification
      );

    } catch (error) {
res.status(500).json({
  message:
    process.env.NODE_ENV === "development"
      ? error.message
      : "Internal Server Error",
});
    }
};

exports.getMyNotifications =
  async (req, res) => {
    try {

      const notifications =
        await Notification.find({
          userId:
            req.user._id,
        }).sort({
          createdAt: -1,
        });

      res.status(200).json(
        notifications
      );

    } catch (error) {
res.status(500).json({
  message:
    process.env.NODE_ENV === "development"
      ? error.message
      : "Internal Server Error",
});
    }
  };

  exports.markAsRead =
  async (req, res) => {
    try {
if (
  !mongoose.Types.ObjectId.isValid(
    req.params.id
  )
) {
  return res.status(400).json({
    message: "Invalid ID",
  });
}
      const notification =
        await Notification.findByIdAndUpdate(
          req.params.id,
          {
            isRead: true,
          },
          {
            new: true,
          }
        );

      res.status(200).json(
        notification
      );

    } catch (error) {
res.status(500).json({
  message:
    process.env.NODE_ENV === "development"
      ? error.message
      : "Internal Server Error",
});
    }
  };
```

## registrationController.js

```javascript
const Registration = require("../models/Registration");
const Event = require("../models/Event");
const Ticket = require("../models/Ticket");
const QRCode = require("qrcode");
const mongoose = require("mongoose");

exports.registerForEvent = async (req, res) => {
  try {
    const eventId = req.params.eventId;

const event = await Event.findById(eventId);
const registrationCount = await Registration.countDocuments({ eventId });

if (registrationCount >= event.capacity) {
  return res.status(400).json({
    message: "Event is full",
  });
}

if (!event) {
  return res.status(404).json({
      message: "Event not found",
 });
}

    const existingRegistration =
      await Registration.findOne({
        userId: req.user._id,
        eventId,
      });

    if (existingRegistration) {
      return res.status(400).json({
        message: "Already registered",
      });
    }

    const registration =
      await Registration.create({
        userId: req.user._id,
        eventId,
      });
    
    const ticketId = "TICKET-" + Date.now();
    const qrCode = await QRCode.toDataURL(ticketId);
    const ticket = await Ticket.create({
  ticketId,
  qrCode,
  userId: req.user._id,
  eventId,
});

const updatedCount = await Registration.countDocuments({ eventId });

res.status(201).json({
  registration,
  ticket,
  registrationCount: updatedCount,
  remainingSeats: event.capacity - updatedCount,
  isFull: updatedCount >= event.capacity,
});

  } catch (error) {
res.status(500).json({
  message:
    process.env.NODE_ENV === "development"
      ? error.message
      : "Internal Server Error",
});}
};

exports.getMyRegistrations = async (req, res) => {
  try {

    const registrations =
      await Registration.find({
        userId: req.user._id,
      }).populate("eventId");

    res.status(200).json(registrations);

  } catch (error) {
res.status(500).json({
  message:
    process.env.NODE_ENV === "development"
      ? error.message
      : "Internal Server Error",
});  }
};

exports.getEventRegistrations = async (req, res) => {
  try {
    const event = await Event.findById(req.params.eventId)
      .populate("organizerId", "name email");

    if (!event) {
      return res.status(404).json({
        message: "Event not found",
      });
    }

const registrations = await Registration.find({
  eventId: req.params.eventId,
})
.populate("userId", "name email")
.lean();

const registrationsWithTickets = await Promise.all(
  registrations.map(async (registration) => {
    const ticket = await Ticket.findOne({
      eventId: registration.eventId,
      userId: registration.userId._id,
    }).select("ticketId");

    return {
      ...registration,
      ticket,
    };
  })
);

    const registrationCount = registrations.length;

    res.status(200).json({
      event: {
        _id: event._id,
        title: event.title,
        description: event.description,
        venue: event.venue,
        eventType: event.eventType,
        startDate: event.startDate,
        endDate: event.endDate,
        status: event.status,
        capacity: event.capacity,
        organizer: event.organizerId,
        registrationCount,
        remainingSeats: event.capacity - registrationCount,
        occupancy: Math.round(
          (registrationCount / event.capacity) * 100
        ),
      },
      registrations: registrationsWithTickets,
    });

  } catch (error) {
res.status(500).json({
  message:
    process.env.NODE_ENV === "development"
      ? error.message
      : "Internal Server Error",
});  }
};

exports.removeRegistration = async (req, res) => {
  try {
    const registration = await Registration.findById(req.params.registrationId);

    if (!registration) {
      return res.status(404).json({
        message: "Registration not found",
      });
    }

    await registration.deleteOne();

    res.status(200).json({
      message: "Registration removed successfully",
    });

  } catch (error) {
res.status(500).json({
  message:
    process.env.NODE_ENV === "development"
      ? error.message
      : "Internal Server Error",
});
  }
};

exports.updateRegistrationStatus = async (req, res) => {
  try {
    const registration = await Registration.findById(req.params.registrationId);

    if (!registration) {
      return res.status(404).json({
        message: "Registration not found",
      });
    }

    registration.status = req.body.status;

    await registration.save();

    res.status(200).json(registration);

  } catch (error) {
res.status(500).json({
  message:
    process.env.NODE_ENV === "development"
      ? error.message
      : "Internal Server Error",
});
  }
};
```

## reportController.js

```javascript
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
    process.env.NODE_ENV === "development"
      ? error.message
      : "Internal Server Error",
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
    process.env.NODE_ENV === "development"
      ? error.message
      : "Internal Server Error",
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
    process.env.NODE_ENV === "development"
      ? error.message
      : "Internal Server Error",
});
    }
  };

  
```

## ticketController.js

```javascript
const Ticket = require("../models/Ticket");
const Registration = require("../models/Registration");

exports.getMyTickets = async (
  req,
  res
) => {
  try {
    const page =
      Number(req.query.page) || 1;

    const limit =
      Number(req.query.limit) || 10;

    const skip =
      (page - 1) * limit;

    const totalTickets =
      await Ticket.countDocuments({
        userId: req.user._id,
      });

    const tickets =
      await Ticket.find({
        userId: req.user._id,
      })
        .populate("eventId")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit);

    res.status(200).json({
      tickets,
      currentPage: page,
      totalPages: Math.ceil(
        totalTickets / limit
      ),
      totalTickets,
    });

  } catch (error) {
res.status(500).json({
  message:
    process.env.NODE_ENV === "development"
      ? error.message
      : "Internal Server Error",
});
  }
};
exports.getTicketById = async (req, res) => {
  try {
if (
  !mongoose.Types.ObjectId.isValid(
    req.params.id
  )
) {
  return res.status(400).json({
    message: "Invalid ID",
  });
}
    const ticket = await Ticket.findById(req.params.id)
      .populate({
        path: "eventId",
        populate: {
          path: "organizerId",
          select: "name email",
        },
      })
      .populate("userId", "name email");

    if (!ticket) {
      return res.status(404).json({
        message: "Ticket not found",
      });
    }

const registration = await Registration.findOne({
  userId: ticket.userId._id,
  eventId: ticket.eventId._id,
}).populate("checkedInBy", "name email");

    res.status(200).json({
      ...ticket.toObject(),
      registrationStatus: registration?.status || "registered",
      registrationDate: registration?.createdAt,
    });

  } catch (error) {
res.status(500).json({
  message:
    process.env.NODE_ENV === "development"
      ? error.message
      : "Internal Server Error",
});
  }
};

exports.verifyTicket = async (req, res) => {
  try {
    const ticket = await Ticket.findOne({
      ticketId: req.params.ticketId,
    })
      .populate("userId", "name email")
      .populate({
        path: "eventId",
        populate: {
          path: "organizerId",
          select: "name email",
        },
      });

    if (!ticket) {
      return res.status(404).json({
        valid: false,
        message: "Ticket not found",
      });
    }

const registration = await Registration.findOne({
  userId: ticket.userId._id,
  eventId: ticket.eventId._id,
}).populate("checkedInBy", "name email");
const registrationCount =
await Registration.countDocuments({
    eventId: ticket.eventId._id,
});

const checkedInCount =
await Registration.countDocuments({
    eventId: ticket.eventId._id,
    status: "checked_in",
});
const capacity = ticket.eventId.capacity;
res.status(200).json({
    valid: true,
    checkedIn:
        registration?.status === "checked_in",
    registrationStatus:
        registration?.status || "registered",
    checkedInAt:
        registration?.checkedInAt,
    checkedInBy:
        registration?.checkedInBy,
    statistics: {
        capacity,
        registered:
            registrationCount,
        checkedIn:
            checkedInCount,
        remaining:
            registrationCount - checkedInCount,
        occupancy:
            Math.round(
                (checkedInCount / capacity) * 100
            ),
    },
    ticket,
});
  } catch (error) {
res.status(500).json({
  message:
    process.env.NODE_ENV === "development"
      ? error.message
      : "Internal Server Error",
});
  }
};
exports.checkInTicket = async (
  req,
  res
) => {
  try {
    const ticket = await Ticket.findOne({
      ticketId: req.params.ticketId,
    });

    if (!ticket) {
      return res.status(404).json({
        message: "Ticket not found",
      });
    }

    const registration =
      await Registration.findOne({
        userId: ticket.userId,
        eventId: ticket.eventId,
      });

    if (!registration) {
      return res.status(404).json({
        message: "Registration not found",
      });
    }

    if (
      registration.status === "checked_in"
    ) {
      return res.status(400).json({
        message:
          "Attendee has already checked in",
      });
    }

    registration.status =
      "checked_in";

    registration.checkedInAt =
      new Date();

    registration.checkedInBy =
      req.user._id;

    await registration.save();

    res.status(200).json({
      message:
        "Check-in successful",
      registration,
    });

  } catch (error) {
res.status(500).json({
  message:
    process.env.NODE_ENV === "development"
      ? error.message
      : "Internal Server Error",
});
  }
};

exports.getCheckInHistory = async (
  req,
  res
) => {
  try {
    const page =
      Number(req.query.page) || 1;

    const limit =
      Number(req.query.limit) || 10;

    const skip =
      (page - 1) * limit;

    const totalRegistrations =
      await Registration.countDocuments({
        status: "checked_in",
      });

    const registrations =
      await Registration.find({
        status: "checked_in",
      })
        .populate(
          "userId",
          "name email"
        )
        .populate(
          "eventId",
          "title venue"
        )
        .populate(
          "checkedInBy",
          "name email"
        )
        .sort({
          checkedInAt: -1,
        })
        .skip(skip)
        .limit(limit);

    res.status(200).json({
      registrations,
      currentPage: page,
      totalPages: Math.ceil(
        totalRegistrations / limit
      ),
      totalRegistrations,
    });

  } catch (error) {
res.status(500).json({
  message:
    process.env.NODE_ENV === "development"
      ? error.message
      : "Internal Server Error",
});
  }
};
```

## verificationController.js

```javascript
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
    process.env.NODE_ENV === "development"
      ? error.message
      : "Internal Server Error",
});
    }
  };
```


