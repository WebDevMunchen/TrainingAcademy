const express = require("express");

const { authenticate } = require("../middlewares/authentication.js");
const {
  createMessage,
  findOneMessage,
} = require("../controllers/message-controller.js");

const messageRouter = express.Router();

messageRouter.route("/createNewMessage").post(authenticate, createMessage);
messageRouter.route("/singleMessage").get(findOneMessage);

module.exports = messageRouter;
