const Event = require("../models/Event");
const Registration = require("../models/Registration");
const mongoose = require("mongoose");
const getEventStatus = require("../utils/eventStatus");

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
try{
const {search,type,venue,status,sort,}=req.query;
const query={};
if(search){
query.title={
$regex:search,
$options:"i",
};
}
if(type && type!=="All"){
query.eventType=type;}
if(venue){
query.venue={
$regex:venue,
$options:"i",
};}
if(status && status!=="All"){
query.status=status;
}
let mongoQuery=
Event.find(query);
switch(sort){

case "newest":
mongoQuery=
mongoQuery.sort({
createdAt:-1,
});
break;

case "oldest":
mongoQuery=
mongoQuery.sort({
createdAt:1,
});
break;

case "capacityAsc":
mongoQuery=
mongoQuery.sort({
capacity:1,
});
break;

case "capacityDesc":
mongoQuery=
mongoQuery.sort({
capacity:-1,
});
break;

default:
mongoQuery=
mongoQuery.sort({
createdAt:-1,
});
}

const events = await mongoQuery.populate(
  "organizerId",
  "name email role"
);
const result = await Promise.all(
  events.map(async (event) => {
    const registrationCount = await Registration.countDocuments({
      eventId: event._id,
    });
    const status = getEventStatus(event);
    return {
      ...event.toObject(),
      status,
      registrationCount,
      remainingSeats: event.capacity - registrationCount,
      isFull: registrationCount >= event.capacity,
    };
  })
);
res.status(200).json(result);
}catch(error){
res.status(500).json({
message:error.message,
});
}
};

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
      message: error.message,
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

