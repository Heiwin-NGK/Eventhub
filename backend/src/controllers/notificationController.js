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
          error.message,
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
          error.message,
      });
    }
  };

  exports.markAsRead =
  async (req, res) => {
    try {

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
          error.message,
      });
    }
  };
