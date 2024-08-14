const express = require("express");
const {
  createApprover,
  editApprover,
  getAllApprovers,
} = require("../controllers/approver-controller.js");
const { authenticate } = require("../middlewares/authentication.js");

const approverRouter = express.Router();

approverRouter.route("/approverList").get(authenticate, getAllApprovers);
approverRouter.route("/create").post(authenticate, createApprover);
approverRouter.route("/update/:id").put(authenticate, editApprover);

module.exports = approverRouter;
