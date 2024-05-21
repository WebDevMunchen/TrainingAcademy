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
  });

  res.status(201).json(activity);
});

const editClassActivity = asyncWrapper(async (req, res, next) => {
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
  } = req.body;

  const { id } = req.params;

  const updatedClass = {
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
  }

  const activity = await ClassActivity.findByIdAndUpdate(id, updatedClass, { new: true });

  if (!activity) {
    throw new ErrorResponse(404, "Activity not found!");
  } else {
    res.status(201).json(activity);
  }
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

  // Retrieve the class activity
  const classActivity = await ClassActivity.findById(id);

  // Check if there is capacity available
  if (classActivity.usedCapacity >= classActivity.capacity) {
    throw new ErrorResponse(404, "Capacity reached!");
  }

  // Increment usedCapacity
  classActivity.usedCapacity += 1;

  // Save the updated class activity
  const updatedCapacity = await classActivity.save();

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

  if(!activity) {
    throw new ErrorResponse(404, "notfound")
  }

  res.status(201).json(activity);
});

const getAllActivities = asyncWrapper(async (req, res, next) => {
  try {
    const { month } = req.query;
    let query = {};

    if (month) {
      query.month = month;
    }

    const allActivities = await ClassActivity.find(query).populate(
      "registeredUsers"
    ).sort({ date: -1, time: -1 }); // Sort by date in ascending order

    if (allActivities.length === 0) {
      return res.status(404).json({ message: "No activities found" });
    }

    res.json(allActivities);
  } catch (error) {
    console.error("Error fetching activities:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});


module.exports = {
  createClassActivity,
  getAllActivities,
  registerClass,
  getActivity,
  increaseClassCapacity,
  decreaseClassCapacity,
  editClassActivity
};
