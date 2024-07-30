const User = require("../models/user-model.js");
const ErrorResponse = require("../utils/errorResponse.js");
const asyncWrapper = require("../utils/asyncWrapper.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const ClassActivity = require("../models/classActivity-model.js");
const Approver = require("../models/approver-model.js");
const Message = require("../models/message-model.js");

const createUser = asyncWrapper(async (req, res, next) => {
  const {
    logID,
    password,
    firstName,
    lastName,
    role,
    department,
    dateOfRegistration,
    status,
    classesRegistered,
    userContactInformation,
    inbox,
  } = req.body;

  const findUser = await User.findOne({ logID });

  if (findUser) {
    return res.status(409).json({ message: "User already registered" });
  }

  const user = await User.create({
    logID,
    password,
    firstName,
    lastName,
    role,
    department,
    dateOfRegistration,
    status,
    classesRegistered,
    userContactInformation,
    inbox,
  });

  res.status(201).json(user);
});

const updateUser = asyncWrapper(async (req, res, next) => {
  const { logID, firstName, lastName, role, department, status } = req.body;

  const { id } = req.params;
  const contactInformationID = "668e958729a4cd5bb513f562";

  const updatedFields = {
    logID,
    firstName,
    lastName,
    role,
    department,
    status,
    userContactInformation: contactInformationID,
  };

  const user = await User.findByIdAndUpdate(id, updatedFields, { new: true });

  if (!user) {
    throw new ErrorResponse(404, "User not found!");
  } else {
    res.status(201).json(user);
  }
});

const updatePassword = asyncWrapper(async (req, res, next) => {
  const { id } = req.params;

  const { password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  const update = { password: hashedPassword };

  const user = await User.findByIdAndUpdate(id, update, { new: true });

  if (!user) {
    throw new ErrorResponse(404, "User not found!");
  }

  res.status(200).json({ message: "Password updated successfully" });
});

const getProfile = asyncWrapper(async (req, res, next) => {
  const { id } = req.user;

  const user = await User.findById(id)
    .populate("classesRegistered.registeredClassID")
    .populate("userContactInformation")
    .populate("message.messageID");
  if (!user) {
    throw new ErrorResponse(404, "User not found!");
  } else {
    res.json(user);
  }
});

const getUserInformation = asyncWrapper(async (req, res, next) => {
  const { id } = req.params;

  const user = await User.findById(id)
    .populate("classesRegistered.registeredClassID")
    .populate("userContactInformation");

  if (!user) {
    throw new ErrorResponse(404, "User not found!");
  } else {
    res.json(user);
  }
});

const getAllUsers = asyncWrapper(async (req, res, next) => {
  const user = await User.find({})
    .populate("classesRegistered.registeredClassID")
    .populate("userContactInformation")
    .populate("message.messageID")
    .sort({ status: 1 });

  res.json(user);
});

const updateUserRegistration = asyncWrapper(async (req, res, next) => {
  const { id } = req.user;
  const { registeredClass } = req;
  const { _id: activity_id } = registeredClass;

  const user = await User.findById(id);
  if (
    user.classesRegistered.some(
      (classItem) => classItem.registeredClassID === activity_id
    )
  ) {
    throw new ErrorResponse(400, "User is already registered for this class");
  }

  const updatedUser = await User.findByIdAndUpdate(
    id,
    { $push: { classesRegistered: { registeredClassID: activity_id } } },
    { new: true }
  )
    .populate("classesRegistered.registeredClassID")
    .populate("userContactInformation")
    .populate("message.messageID");

  const approver = await Approver.findById(user.userContactInformation);

  let recipientEmail;
  switch (user.department) {
    case "logistik":
      recipientEmail = approver.logistik;
      break;
    case "vertrieb":
      recipientEmail = approver.vertrieb;
      break;
    case "HR & Training":
      recipientEmail = approver.hr;
      break;
    case "IT & Services":
      recipientEmail = approver.it;
      break;
    case "fuhrpark":
      recipientEmail = approver.fuhrpark;
      break;
    case "buchhaltung":
      recipientEmail = approver.buchhaltung;
      break;
    case "einkauf":
      recipientEmail = approver.einkauf;
      break;
    case "design & Planung":
      recipientEmail = approver.design;
      break;
    case "projektmanagement":
      recipientEmail = approver.projektmanagement;
      break;
    case "officemanagement":
      recipientEmail = approver.officemanagement;
      break;
    default:
      recipientEmail = process.env.DEFAULT_APPROVER_EMAIL;
      break;
  }

  let recipientEmailSubstitution;
  switch (user.department) {
    case "logistik":
      recipientEmailSubstitution = approver.logistikSubstitute;
      break;
    case "vertrieb":
      recipientEmailSubstitution = approver.vertriebSubstitute;
      break;
    case "HR & Training":
      recipientEmailSubstitution = approver.hrSubstitute;
      break;
    case "IT & Services":
      recipientEmailSubstitution = approver.itSubstitute;
      break;
    case "fuhrpark":
      recipientEmailSubstitution = approver.fuhrparkSubstitute;
      break;
    case "buchhaltung":
      recipientEmailSubstitution = approver.buchhaltungSubstitute;
      break;
    case "einkauf":
      recipientEmailSubstitution = approver.einkaufSubstitute;
      break;
    case "design & Planung":
      recipientEmailSubstitution = approver.designSubstitute;
      break;
    case "projektmanagement":
      recipientEmailSubstitution = approver.projektmanagementSubstitute;
      break;
    case "officemanagement":
      recipientEmailSubstitution = approver.officemanagementSubstitute;
      break;
    default:
      recipientEmailSubstitution = process.env.DEFAULT_APPROVER_EMAIL;
      break;
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.USER,
      pass: process.env.APP_PASSWORD,
    },
  });

  const mailOptions = {
    from: {
      name: "Ausstehende Genehmigung - No reply",
      address: process.env.USER,
    },
    to: `${recipientEmail}, ${recipientEmailSubstitution}`,
    subject: "Training Academy - Rent Group München",
    text: "Training Academy - Rent Group München",
    html: `${user.firstName + " " + user.lastName} hat sich für die Schulung "${
      registeredClass.title
    }" angemeldet! <br/ ><br /> Zum Genehmigungsprozess: http://localhost:5173/classInformation/${activity_id}`,
  };

  const sendMail = async (transporter, mailOptions) => {
    try {
      await transporter.sendMail(mailOptions);
    } catch (error) {}
  };

  sendMail(transporter, mailOptions);

  res.status(201).json(updatedUser);
});

const updateClassStatus = asyncWrapper(async (req, res, next) => {
  const { id } = req.params;
  const { classId, newStatus, reason } = req.body;

  try {
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const classIndex = user.classesRegistered.findIndex((classObj) => {
      if (classObj.registeredClassID) {
        return classObj.registeredClassID.toString() === classId;
      }
      return false;
    });

    if (classIndex === -1) {
      return res.status(404).json({ error: "Class not found for this user" });
    }

    const activity = await ClassActivity.findById(classId);

    if (!activity) {
      return res.status(404).json({ error: "Class activity not found" });
    }

    const currentDate = new Date();
    const activityDate = new Date(activity.date);
    const [activityHours, activityMinutes] = activity.time
      .split(":")
      .map(Number);
    activityDate.setHours(activityHours, activityMinutes, 0, 0);

    const timeDifference = activityDate - currentDate;

    if (timeDifference <= 24 * 60 * 60 * 1000) {
      return res.status(400).json({
        error:
          "Cannot update status within 24 hours before the activity start date and time",
      });
    }

    if (
      activity.capacity === activity.usedCapacity &&
      (user.classesRegistered[classIndex].status === "abgelehnt" ||
        user.classesRegistered[classIndex].status === "ausstehend")
    ) {
      return res
        .status(400)
        .json({ error: "Activity capacity is already full" });
    }

    user.classesRegistered[classIndex].status = newStatus;
    if (newStatus === "abgelehnt") {
      user.classesRegistered[classIndex].reason = reason;
    }

    await user.save();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.USER,
        pass: process.env.APP_PASSWORD,
      },
    });

    let mailHtml;
    if (newStatus === "abgelehnt") {
      mailHtml = `Die Anfrage von ${user.firstName} ${user.lastName} für die Schulung "${activity.title}" wurde ${newStatus}! <br/><br/>Grund: ${reason}`;
    } else if (newStatus === "genehmigt") {
      mailHtml = `Die Anfrage von ${user.firstName} ${user.lastName} für die Schulung "${activity.title}" wurde ${newStatus}!`;
    } else {
      mailHtml = `Die Anfrage von ${user.firstName} ${user.lastName} für die Schulung "${activity.title}" wurde ${newStatus}!`;
    }

    const mailOptions = {
      from: {
        name: "Antwort ausstehende Anfrage",
        address: process.env.USER,
      },
      to: `${user.inbox}`,
      subject: "Training Academy - Rent Group München",
      text: "Training Academy - Rent Group München",
      html: mailHtml,
    };

    const sendMail = async (transporter, mailOptions) => {
      try {
        await transporter.sendMail(mailOptions);
      } catch (error) {}
    };

    sendMail(transporter, mailOptions);

    res.status(200).json({ message: "Class status updated successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

const updateAttended = asyncWrapper(async (req, res, next) => {
  const { id } = req.params;
  const { classId, newStatusAttended } = req.body;

  const user = await User.findById(id);

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  const classIndex = user.classesRegistered.findIndex((classObj) => {
    if (classObj.registeredClassID) {
      return classObj.registeredClassID.toString() === classId;
    }
    return false;
  });

  if (classIndex === -1) {
    return res.status(404).json({ error: "Class not found for this user" });
  }

  user.classesRegistered[classIndex].statusAttended = newStatusAttended;

  await user.save();
});

const updateNotAttended = asyncWrapper(async (req, res, next) => {
  const { id } = req.params;
  const { classId, newStatusAttended } = req.body;

  const user = await User.findById(id);

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  const classIndex = user.classesRegistered.findIndex((classObj) => {
    if (classObj.registeredClassID) {
      return classObj.registeredClassID.toString() === classId;
    }
    return false;
  });

  if (classIndex === -1) {
    return res.status(404).json({ error: "Class not found for this user" });
  }

  user.classesRegistered[classIndex].statusAttended = newStatusAttended;

  await user.save();
});

const login = asyncWrapper(async (req, res, next) => {
  const { logID, password } = req.body;

  const user = await User.findOne({ logID })
    .select("+password")
    .populate("classesRegistered.registeredClassID")
    .populate("userContactInformation")
    .populate("message.messageID");

  if (!user) {
    return res.status(404).json({ error: "User not found!" });
  }

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    return res.status(401).json({ error: "Incorrect password!" });
  }

  const payload = {
    id: user._id,
    logID: user.logID,
    role: user.role,
  };

  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "480m",
  });

  delete user.password;

  res
    .cookie("access_token", token, { httpOnly: true, maxAge: 28800000 })
    .json(user);
});

const logout = asyncWrapper(async (req, res, next) => {
  res
    .cookie("access_token", "", { httpOnly: true, maxAge: 0 })
    .json({ success: true });
});

const markRead = asyncWrapper(async (req, res, next) => {
  const { id } = req.params; // message ID
  const { id: userId } = req.user;
  const { status: newStatus } = req.body;

  try {
    const updatedUser = await User.findOneAndUpdate(
      { _id: userId, 'message.messageID': id },
      { $set: { 'message.$.status': newStatus } },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).send({ message: 'Message not found' });
    }

    res.status(200).send(updatedUser);
  } catch (error) {
    console.error('Error marking message as read:', error);
    res.status(500).send({ error: 'Error marking message as read' });
  }
});


module.exports = {
  createUser,
  getProfile,
  login,
  logout,
  updateUserRegistration,
  getAllUsers,
  updateClassStatus,
  updateAttended,
  updateNotAttended,
  getUserInformation,
  updateUser,
  updatePassword,
  markRead
};
