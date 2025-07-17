const express = require("express");
const trackerControllers = require("../controllers/trackerControllers");
const routerTracker = express.Router();

routerTracker.get("/track", trackerControllers.trackUser);
routerTracker.get("/dailytracked", trackerControllers.getTrackedUsersDay);
routerTracker.get("/weeklytracked", trackerControllers.getTrackedUsersWeek);
routerTracker.get("/monthlytracked", trackerControllers.getTrackedUsersMonth);
routerTracker.get("/totaltracked", trackerControllers.getTotalTrackedUsers);
module.exports = routerTracker;
