const express = require("express");
const { createClassActivity, getAllActivities, registerClass, getActivity, increaseClassCapacity, decreaseClassCapacity } = require("../controllers/classActivity-controller.js");
const { authenticate } = require("../middlewares/authentication.js");
const { updateUserRegistration } = require("../controllers/user-controller.js");

const classActivityRouter = express.Router();

classActivityRouter.route("/allActivities").get(authenticate, getAllActivities);
classActivityRouter.route("/create").post(authenticate, createClassActivity);
classActivityRouter.route("/:id").get(authenticate, getActivity);
classActivityRouter.route("/registerClass/:id").put(authenticate, registerClass, updateUserRegistration);
classActivityRouter.route("/increaseClassCapacity/:id").put(authenticate, increaseClassCapacity);
classActivityRouter.route("/decreaseClassCapacity/:id").put(authenticate, decreaseClassCapacity);

module.exports = classActivityRouter;
