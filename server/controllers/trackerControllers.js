const trackerModels = require("../models/trackerModels");

const trackUser = async (req, res) => {
  try {
    if (!req.cookies.tracked) {
      res.cookie("tracked", true, {
        httpOnly: true,
        maxAge: 1000 * 60 * 15,
      });
      const userAgent = req.headers["user-agent"];

      await trackerModels.trackUser(userAgent);

      return res.status(201).json({ status: "success", user: userAgent });
    }
    return res.status(200).json({ message: "User already tracked" });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

const getTrackedUsersDay = async (req, res) => {
  try {
    const result = await trackerModels.getTrackedUsersDay();
    res.status(200).json({ status: "success", data: result });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

const getTrackedUsersWeek = async (req, res) => {
  try {
    const result = await trackerModels.getTrackedUsersWeek();
    res.status(200).json({ status: "success", data: result });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

const getTrackedUsersMonth = async (req, res) => {
  try {
    const result = await trackerModels.getTrackedUsersMonth();
    res.status(200).json({ status: "success", data: result });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Internal Server Error",
      error: error.message,
    });
  }
};
const getTotalTrackedUsers = async (req, res) => {
  try {
    const result = await trackerModels.getTotalTrackedUsers();
    res.status(200).json({ status: "success", data: result });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Internal Server Error",
      error: error.message,
    });
  }
};
module.exports = {
  trackUser,
  getTrackedUsersDay,
  getTrackedUsersWeek,
  getTrackedUsersMonth,
  getTotalTrackedUsers,
};
