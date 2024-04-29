const express = require("express");
const { createClassActivity, getAllActivities, registerClass, getActivity } = require("../controllers/classActivity-controller.js");
const { authenticate } = require("../middlewares/authentication.js");
const { updateUserRegistration } = require("../controllers/user-controller.js");

const classActivityRouter = express.Router();

classActivityRouter.route("/allActivities").get(getAllActivities);
classActivityRouter.route("/create").post(authenticate, createClassActivity);
classActivityRouter.route("/:id").get(authenticate, getActivity);
classActivityRouter.route("/registerClass/:id").put(authenticate, registerClass, updateUserRegistration);

module.exports = classActivityRouter;
