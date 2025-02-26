const express = require("express");
const multer = require("multer");
const {
  createClassActivity,
  getAllActivities,
  registerClass,
  getActivity,
  increaseClassCapacity,
  decreaseClassCapacity,
  editClassActivity,
  cancelUserRegistration,
  updateCancelationReason,
  deleteClass,
  enlist,
  exportCalendar,
  sendReminder,
  uploadClassFile,
} = require("../controllers/classActivity-controller.js");
const { authenticate } = require("../middlewares/authentication.js");
const { updateUserRegistration } = require("../controllers/user-controller.js");
const upload = require("../utils/multerConfig.js");
const upload2 = multer({ storage: multer.diskStorage({}) });


const classActivityRouter = express.Router();

classActivityRouter.route("/allActivities").get(getAllActivities);
classActivityRouter.route("/:id").get(getActivity);
classActivityRouter
  .route("/create")
  .post(authenticate, upload.single("file"), createClassActivity);
classActivityRouter
  .route("/registerClass/:id")
  .put(authenticate, registerClass, updateUserRegistration);
  classActivityRouter
  .route("/cancelClass/:id")
  .put(authenticate, cancelUserRegistration);
  classActivityRouter.put(
    "/uploadFile/:id",
    authenticate,
    upload2.single("file"), // Ensure multer handles file upload
    uploadClassFile
  );
classActivityRouter
  .route("/updateReason/:id")
  .put(authenticate, updateCancelationReason);
classActivityRouter
  .route("/editClass/:id")
  .put(authenticate, upload.single("file"), editClassActivity);
classActivityRouter
  .route("/increaseClassCapacity/:id")
  .put(authenticate, increaseClassCapacity);
classActivityRouter
  .route("/decreaseClassCapacity/:id")
  .put(authenticate, decreaseClassCapacity);
classActivityRouter.route("/deleteClass/:id").delete(authenticate, deleteClass);
classActivityRouter.route("/enlist/:id").put(authenticate, enlist);
classActivityRouter.route("/sendReminder/:id").put(authenticate, sendReminder);
classActivityRouter.route("/export-calendar/:id").get(authenticate, exportCalendar);

module.exports = classActivityRouter;
