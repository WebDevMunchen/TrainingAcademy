const { Schema, model } = require("mongoose");

const messageSchema = new Schema({
  sender: {type: String, required: true},
  sendersEmail: {type: String, required: true},
  messageTitle: { type: String, required: true },
  messageContent: { type: String, required: true },
  timeStamp: { type: Date, default: Date.now()},
  messageType: {type: String, required: true}
})

const Message = model("Message", messageSchema);

module.exports = Message;
