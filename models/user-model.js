const bcrypt = require("bcrypt");
const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  email: { type: String, required: true },
  password: { type: String, required: true, select: false },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  deparment: {type: String},
  role: {
    type: String,
    enum: ["admin", "ASP", "teacher", "user"],
    default: "user",
  },
  dateOfRegistration: { type: Date, default: Date.now() },
  userContactInformation: {type: String, required: true},
  status: { type: String, enum: ["active", "inactive"], default: "active" },
  classesRegistered: [
    {
      registeredClassID: { type: Schema.Types.ObjectId, ref: "ClassActivitie" },
      status: {
        type: String,
        enum: ["ausstehend", "genehmigt", "abgelehnt"],
        default: "ausstehend",
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
