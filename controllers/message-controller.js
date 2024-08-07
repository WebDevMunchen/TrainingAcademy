const Message = require("../models/message-model.js");
const ErrorResponse = require("../utils/errorResponse.js");
const asyncWrapper = require("../utils/asyncWrapper.js");
const User = require("../models/user-model.js");

const createMessage = asyncWrapper(async (req, res, next) => {
  const {
    messageTitle,
    messageContent,
    timeStamp,
    messageType,
    sender,
    sendersEmail,
  } = req.body;

  const message = await Message.create({
    sender,
    messageTitle,
    messageContent,
    timeStamp,
    messageType,
    sendersEmail,
  });

  const users = await User.find().populate("message.messageID");

  const messageID = message._id;
  const updateUserPromises = users.map((user) => {
    user.message.push({ messageID, status: "unread" });
    return user.save();
  });

  await Promise.all(updateUserPromises);

  res.status(201).json(message);
});

const findOneMessage = asyncWrapper(async (req, res, next) => {
  const { id } = req.params;

  const singleMessage = await Message.findById(id);

  if (!singleMessage) {
    throw new ErrorResponse("Message not found!");
  } else {
    res.stutus(201).json(singleMessage);
  }
});

module.exports = {
  createMessage,
  findOneMessage,
};
