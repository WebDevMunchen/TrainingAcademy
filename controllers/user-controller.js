const User = require("../models/user-model.js");
const ErrorResponse = require("../utils/errorResponse.js");
const asyncWrapper = require("../utils/asyncWrapper.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer")


const createUser = asyncWrapper(async (req, res, next) => {
  const {
    email,
    password,
    firstName,
    lastName,
    role,
    department,
    dateOfRegistration,
    status,
    classesRegistered,
    userContactInformation
  } = req.body;

  const findUser = await User.findOne({ email });

  if (findUser) {
    throw new ErrorResponse(409, "User already exists!");
  }

  const user = await User.create({
    email,
    password,
    firstName,
    lastName,
    role,
    department,
    dateOfRegistration,
    status,
    classesRegistered,
    userContactInformation
  });

  res.status(201).json(user);
});

const getProfile = asyncWrapper(async (req, res, next) => {
  const { id } = req.user;

  const user = await User.findById(id).populate(
    "classesRegistered.registeredClassID"
  );

  if (!user) {
    throw new ErrorResponse(404, "User not found!");
  } else {
    res.json(user);
  }
});

const getAllUsers = asyncWrapper(async (req, res, next) => {
  const user = await User.find({}).populate(
    "classesRegistered.registeredClassID"
  );

  res.json(user);
});

const updateUserRegistration = asyncWrapper(async (req, res, next) => {
  const { id } = req.user;
  const { registeredClass } = req;
  const { _id: activity_id } = registeredClass;

  const user = await User.findById(id).populate("classesRegistered.registeredClassID");
  if (
    user.classesRegistered.some(
      (classItem) =>
        classItem.registeredClassID.toString() === activity_id.toString()
    )
  ) {
    throw new ErrorResponse(400, "User is already registered for this class");
  }

  const updatedUser = await User.findByIdAndUpdate(
    id,
    { $push: { classesRegistered: { registeredClassID: activity_id } } },
    { new: true }
  ).populate("classesRegistered.registeredClassID");

  const transporter = nodemailer.createTransport({
    service: 'gmail',
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
      name: "Ausstehende Genehmigung",
      address: process.env.USER
    },
    to:`${user.userContactInformation}`,
    subject: "Training Academy - Rent Group München",
    text: "Training Academy - Rent Group München",
    html: `${user.firstName + " " + user.lastName} hat sich für die Schulung "${registeredClass.title}" angemeldet! <br/ ><br /> Zur Genehmigungsprozes: http://localhost:5173/classes/${activity_id}`,
  }
  
  // const sendMail = async(transporter, mailOptions) => {
  //     try {
  //       await transporter.sendMail(mailOptions)
  //       console.log("Success")
  //     } catch (error) {
  //       console.log(error)    
  //     }
  //   }

  // sendMail(transporter, mailOptions)

 
  res.status(201).json(updatedUser);
});

const updateClassStatus = asyncWrapper(async (req, res, next) => {
  const { id } = req.params;
  const { classId, newStatus } = req.body; 

  try {
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const classIndex = user.classesRegistered.findIndex(
      (classObj) => classObj.registeredClassID.toString() === classId
    );

    if (classIndex === -1) {
      return res.status(404).json({ error: "Class not found for this user" });
    }

    user.classesRegistered[classIndex].status = newStatus;

    await user.save();

    const transporter = nodemailer.createTransport({
      service: 'gmail',
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
        name: "Antwort ausstehende Anfrage",
        address: user.userContactInformation
      },
      to:`${user.email}`,
      subject: "Training Academy - Rent Group München",
      text: "Training Academy - Rent Group München",
      html: `Deine Anfrage für die Schulung wurde ${newStatus}! <br/ ><br />`,
    }
    
    // const sendMail = async(transporter, mailOptions) => {
    //     try {
    //       await transporter.sendMail(mailOptions)
    //       console.log("Success")
    //     } catch (error) {
    //       console.log(error)    
    //     }
    //   }
  
    // sendMail(transporter, mailOptions)

    res.status(200).json({ message: "Class status updated successfully" });
  } catch (error) {
    console.error("Error updating class status:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

const login = asyncWrapper(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select("+password").populate("classesRegistered.registeredClassID");

  if (!user) {
    throw new ErrorResponse(404, "User does not exist!");
  }

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    throw new ErrorResponse(401, "Incorrect password!");
  }

  const payload = {
    id: user._id,
    email: user.email,
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
module.exports = {
  createUser,
  getProfile,
  login,
  logout,
  updateUserRegistration,
  getAllUsers,
  updateClassStatus
};
