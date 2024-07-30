const bcrypt = require("bcrypt");
const { Schema, model, default: mongoose } = require("mongoose");

const defaultApproverId = new mongoose.Types.ObjectId(
  "668e958729a4cd5bb513f562"
);

const userSchema = new Schema({
  logID: { type: String, required: true },
  password: { type: String, required: true, select: false },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  department: { type: String, required: true },
  role: {
    type: String,
    enum: ["admin", "ASP", "teacher", "user"],
    default: "user",
  },
  dateOfRegistration: { type: Date, default: Date.now() },
  userContactInformation: {
    type: Schema.Types.ObjectId,
    ref: "Approver",
    default: defaultApproverId,
  },
  status: { type: String, enum: ["aktiv", "inaktiv"], default: "aktiv" },
  inbox: { type: String, default: "webdevmunchen@gmail.com" },
  classesRegistered: [
    {
      registeredClassID: { type: Schema.Types.ObjectId, ref: "ClassActivitie" },
      status: {
        type: String,
        enum: ["ausstehend", "genehmigt", "abgelehnt"],
        default: "ausstehend",
      },
      statusAttended: {
        type: String,
        enum: ["teilgenommen", "nicht teilgenommen", "in Prüfung"],
        default: "in Prüfung",
      },
    },
  ],
  message: [
    {
      messageID: { type: Schema.Types.ObjectId, ref: "Message" },
      status: {
        type: String,
        enum: ["read", "unread"],
        default: "unread",
      },
    },
  ],
});

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

const User = model("User", userSchema);

module.exports = User;
