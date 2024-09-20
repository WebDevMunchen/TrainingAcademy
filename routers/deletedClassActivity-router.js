const express = require("express");

const { authenticate } = require("../middlewares/authentication.js");
const {
  getAllDeletedActivities,
} = require("../controllers/deletedClassActivity-controller.js");

const deletedClassActivityRouter = express.Router();

deletedClassActivityRouter
  .route("/response")
  .get(authenticate, getAllDeletedActivities);

module.exports = deletedClassActivityRouter;
