const ClassActivity = require("../models/classActivity-model.js");
const ErrorResponse = require("../utils/errorResponse.js");
const asyncWrapper = require("../utils/asyncWrapper.js");

const createClassActivity = asyncWrapper(async (req, res, next) => {
  const {
    title,
    description,
    date,
    duration,
    location,
    department,
    capacity,
    month,
    time,
    teacher,
    contactPerson,
  } = req.body;

  const activity = await ClassActivity.create({
    title,
    description,
    date,
    duration,
    location,
    department,
    capacity,
    month,
    time,
    teacher,
    contactPerson,
  });

  res.status(201).json(activity);
});

const registerClass = asyncWrapper(async (req, res, next) => {
  const { id } = req.params;
  const { id: userID } = req.user;

  // Check if the user is already registered for this class
  const classActivity = await ClassActivity.findById(id);
  if (classActivity.registeredUsers.includes(userID)) {
    throw new ErrorResponse(400, "User is already registered for this class");
  }

  // If the user is not already registered, add them to the registered users array
  const registeredClass = await ClassActivity.findByIdAndUpdate(
    id,
    { $push: { registeredUsers: userID } },
    { new: true, populate: "registeredUsers" }
  );

  req.registeredClass = registeredClass;

  next();
});

const increaseClassCapacity = asyncWrapper(async (req, res, next) => {
  const { id } = req.params;

  const updatedCapacity = await ClassActivity.findByIdAndUpdate(
    id,

    { $inc: { usedCapacity: 1 } },
    { new: true, populate: "registeredUsers" }
  );

  await updatedCapacity.save();

  res.status(201).json(updatedCapacity);
});

const decreaseClassCapacity = asyncWrapper(async (req, res, next) => {
  const { id } = req.params;

  const updatedCapacity = await ClassActivity.findByIdAndUpdate(
    id,

    { $inc: { usedCapacity: -1 } },
    { new: true, populate: "registeredUsers" }
  );

  await updatedCapacity.save();

  res.status(201).json(updatedCapacity);
});

const getActivity = asyncWrapper(async (req, res, next) => {
  const { id } = req.params;

  const activity = await ClassActivity.findById(id).populate("registeredUsers");

  res.status(201).json(activity);
});

const getAllActivities = asyncWrapper(async (req, res, next) => {
  const allActivities = await ClassActivity.find({}).populate(
    "registeredUsers"
  );

  res.json(allActivities);
});

module.exports = {
  createClassActivity,
  getAllActivities,
  registerClass,
  getActivity,
  increaseClassCapacity,
  decreaseClassCapacity
};
