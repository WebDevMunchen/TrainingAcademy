const express = require("express");
const {
  createClassActivity,
  getAllActivities,
  registerClass,
  getActivity,
  increaseClassCapacity,
  decreaseClassCapacity,
  editClassActivity,
  cancelUserRegistration,
  decreaseClassCapacityOnCancel,
} = require("../controllers/classActivity-controller.js");
const { authenticate } = require("../middlewares/authentication.js");
const { updateUserRegistration } = require("../controllers/user-controller.js");

const classActivityRouter = express.Router();

classActivityRouter.route("/allActivities").get(getAllActivities);
classActivityRouter.route("/:id").get(getActivity);
classActivityRouter.route("/create").post(authenticate, createClassActivity);
classActivityRouter
  .route("/registerClass/:id")
  .put(authenticate, registerClass, updateUserRegistration);
classActivityRouter
  .route("/cancelClass/:id")
  .put(authenticate, cancelUserRegistration);
// classActivityRouter
//   .route("/decreaseClassCapacityCancel/:id")
//   .put(authenticate, decreaseClassCapacityOnCancel);
classActivityRouter
  .route("/editClass/:id")
  .put(authenticate, editClassActivity);
classActivityRouter
  .route("/increaseClassCapacity/:id")
  .put(authenticate, increaseClassCapacity);
classActivityRouter
  .route("/decreaseClassCapacity/:id")
  .put(authenticate, decreaseClassCapacity);

module.exports = classActivityRouter;
