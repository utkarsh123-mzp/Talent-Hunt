import Notification from "../models/Notification.js";
import { successResponse, errorResponse } from "../utils/apiResponse.js";

export const getNotifications = async (req, res, next) => {
  try {
    const notifications = await Notification.find({ user: req.user._id })
      .sort({ createdAt: -1 })
      .limit(30);

    const unreadCount = await Notification.countDocuments({
      user: req.user._id,
      isRead: false
    });

    return successResponse(res, "Notifications retrieved", {
      notifications,
      unreadCount
    });
  } catch (error) {
    next(error);
  }
};

export const markAsRead = async (req, res, next) => {
  try {
    const notification = await Notification.findOne({
      _id: req.params.id,
      user: req.user._id
    });

    if (!notification) {
      return errorResponse(res, "Notification not found", 404);
    }

    notification.isRead = true;
    await notification.save();

    return successResponse(res, "Notification marked as read", { notification });
  } catch (error) {
    next(error);
  }
};

export const markAllAsRead = async (req, res, next) => {
  try {
    await Notification.updateMany(
      { user: req.user._id, isRead: false },
      { isRead: true }
    );

    return successResponse(res, "All notifications marked as read", {});
  } catch (error) {
    next(error);
  }
};
