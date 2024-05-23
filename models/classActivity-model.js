const { Schema, model } = require("mongoose");

const classActivitySchema = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  month: {
    type: String,
    enum: [
      "januar",
      "februar",
      "märz",
      "april",
      "mai",
      "juni",
      "juli",
      "august",
      "september",
      "oktober",
      "november",
      "december",
    ],
    required: true,
  },
  date: { type: Date, required: true },
  duration: { type: Number, required: true },
  time: { type: String, required: true },
  location: { type: String, required: true },
  department: [{ type: String }],
  capacity: { type: Number, required: true },
  usedCapacity: { type: Number, default: 0 },
  registeredUsers: [{ type: Schema.Types.ObjectId, ref: "User" }],
  teacher: { type: String, required: true },
});

const ClassActivity = model("ClassActivitie", classActivitySchema);

module.exports = ClassActivity;
