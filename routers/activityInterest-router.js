const express = require("express");

const {
  createInterest,
  editInterest,
  getEveryInterest,
  deleteInterest,
  getInterest,
  showInterest,
  markTookPlace,
} = require("../controllers/activityInterest-controller.js");

const { authenticate } = require("../middlewares/authentication.js");

const upload = require("../utils/multerConfig.js");

const activityInterestRouter = express.Router();

activityInterestRouter
  .route("/getEveryInterest")
  .get(authenticate, getEveryInterest);
activityInterestRouter
  .route("/createInterest")
  .post(authenticate, upload.single("previewPicture"), createInterest);
activityInterestRouter.route("/getInterest/:id").get(authenticate, getInterest);
activityInterestRouter.route("/showInterest/:id").put(authenticate, showInterest);
activityInterestRouter.route("/markTookPlace/:id").put(authenticate, markTookPlace);
activityInterestRouter
  .route("/updateInterest/:id")
  .put(authenticate, upload.single("previewPicture"), editInterest);
activityInterestRouter
  .route("/deleteInterest/:id")
  .delete(authenticate, deleteInterest);
module.exports = activityInterestRouter;
