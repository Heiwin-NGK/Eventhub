const Notification = require("../models/Notification");
const mongoose = require("mongoose");

const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/AppError");

exports.createNotification =
  catchAsync(
    async (
      req,
      res,
      next
    ) => {
      const notification =
        await Notification.create(
          req.body
        );

      res.status(201).json(
        notification
      );
    }
  );

exports.getMyNotifications =
  catchAsync(
    async (
      req,
      res,
      next
    ) => {
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
    }
  );

exports.markAsRead =
  catchAsync(
    async (
      req,
      res,
      next
    ) => {
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

      if (!notification) {
        return next(
          new AppError(
            "Notification not found",
            404
          )
        );
      }

      res.status(200).json(
        notification
      );
    }
  );