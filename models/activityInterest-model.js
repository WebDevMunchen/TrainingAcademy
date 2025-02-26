const { Schema, model } = require("mongoose");

const activityInterestSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  previewPicture: { type: String, required: true },
  tag: [{ type: String, required: true }],
  targetGroup: [{ type: String, required: true }],
  lastTookPlace: { type: Date },
  interestedUsers: [
    {
      user: { type: Schema.Types.ObjectId, ref: "User", required: true },
      interestedAt: { type: Date, default: Date.now },
    },
  ],
  pastInterests: [
    {
      date: { type: Date, required: true }, // The date when this group of users was cleared
      users: [
        {
          user: { type: Schema.Types.ObjectId, ref: "User", required: true },
          interestedAt: { type: Date },
        },
      ],
    },
  ],
});

const ActivityInterest = model("ActivityInterest", activityInterestSchema);

module.exports = ActivityInterest;
