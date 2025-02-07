const { Schema, model } = require("mongoose");

const activityInterestSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  previewPicture: { type: String, required: true },
  favCount: { type: Number, default: 0 },
  tag: [{ type: String, required: true}],
  targetGroup: [{ type: String, required: true }],
  tookPlace: { type: Boolean, default: false },
  interestedUsers: [{ type: Schema.Types.ObjectId, ref: "User" }],
});

const ActivityInterest = model("ActivityInterest", activityInterestSchema);

module.exports = ActivityInterest;