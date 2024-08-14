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
      "dezember",
    ],
    required: true,
  },
  year: {
    type: String,
    enum: [
      "2024",
      "2025",
      "2026",
      "2027",
      "2028",
      "2029",
      "2030",
      "2031",
      "2032",
      "2033"
    ],
    required: true,
    default: function() {
      return new Date().getFullYear().toString();
    }
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
  safetyBriefing: { type: Boolean, default: false },
  stornoReason: [{ type: String }],
  fileUrl: { type: String },
});

const ClassActivity = model("ClassActivitie", classActivitySchema);

module.exports = ClassActivity;
