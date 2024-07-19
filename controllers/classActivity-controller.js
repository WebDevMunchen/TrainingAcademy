const ClassActivity = require("../models/classActivity-model.js");
const ErrorResponse = require("../utils/errorResponse.js");
const asyncWrapper = require("../utils/asyncWrapper.js");
const User = require("../models/user-model.js");

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
    safetyBriefing,
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
    safetyBriefing,
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
    safetyBriefing,
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
    safetyBriefing,
  };

  const activity = await ClassActivity.findByIdAndUpdate(id, updatedClass, {
    new: true,
  });

  if (!activity) {
    throw new ErrorResponse(404, "Activity not found!");
  } else {
    res.status(201).json(activity);
  }
});

const registerClass = asyncWrapper(async (req, res, next) => {
  const { id } = req.params;
  const { id: userID } = req.user;

  const classActivity = await ClassActivity.findById(id);
  if (classActivity.registeredUsers.includes(userID)) {
    throw new ErrorResponse(400, "User is already registered for this class");
  }

  const registeredClass = await ClassActivity.findByIdAndUpdate(
    id,
    { $push: { registeredUsers: userID } },
    { new: true, populate: "registeredUsers" }
  );

  req.registeredClass = registeredClass;

  next();
});

const cancelUserRegistration = asyncWrapper(async (req, res, next) => {
  const { id } = req.params;
  const { id: userID } = req.user;

  try {
    const user = await User.findById(userID);
    if (!user) {
      return next(new ErrorResponse(404, "User not found"));
    }

    const registeredClass = user.classesRegistered.find(
      (classItem) => classItem.registeredClassID.toString() === id
    );

    if (!registeredClass) {
      return res
        .status(400)
        .json({ message: "User is not registered for this class." });
    }

    user.classesRegistered = user.classesRegistered.filter(
      (classItem) => classItem.registeredClassID.toString() !== id
    );
    await user.save();

    const classActivity = await ClassActivity.findById(id).populate(
      "registeredUsers"
    );

    if (!classActivity) {
      return res.status(404).json({ message: "ClassActivity not found." });
    }

    if (registeredClass.status === "genehmigt") {
      classActivity.usedCapacity = classActivity.usedCapacity - 1;
    }

    classActivity.registeredUsers = classActivity.registeredUsers.filter(
      (registeredUser) => registeredUser._id.toString() !== userID
    );

    await classActivity.save();

    const updatedClassActivity = await ClassActivity.findById(id).populate(
      "registeredUsers"
    );

    res.json({ message: "Success", updatedCapacity: updatedClassActivity });
  } catch (error) {
    console.error("Error in cancelUserRegistration:", error);
    next(error);
  }
});

const increaseClassCapacity = asyncWrapper(async (req, res, next) => {
  const { id } = req.params;

  const classActivity = await ClassActivity.findById(id);

  if (classActivity.usedCapacity >= classActivity.capacity) {
    throw new ErrorResponse(404, "Capacity reached!");
  }

  classActivity.usedCapacity += 1;

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

// const decreaseClassCapacityOnCancel = asyncWrapper(async (req, res, next) => {
//   const { id } = req.params;
//   const { id: userID } = req.user;

//   try {
//     console.log("Class ID:", id);
//     console.log("Fetching user with ID:", userID);

//     const user = await User.findById(userID);

//     if (!user) {
//       console.log("User not found");
//       return res.status(404).json({ message: "User not found." });
//     }

//     console.log("User fetched:", user);
//     const classIdStr = id.toString();
//     console.log("Class ID string:", classIdStr);

//     user.classesRegistered.forEach(classReg => {
//       console.log(`Checking classReg: ${classReg.registeredClassID.toString()} with status: ${classReg.status}`);
//     });

//     const registeredClass = user.classesRegistered.find(
//       (classReg) => classReg.registeredClassID.toString() === classIdStr && classReg.status === "genehmigt"
//     );

//     if (!registeredClass) {
//       console.log("User is not registered for this class or status is not 'genehmigt'.");
//       return res.status(400).json({ message: "User is not registered for this class or status is not 'genehmigt'." });
//     }

//     console.log("User is registered for the class with status 'genehmigt'. Decreasing capacity.");

//     const updatedCapacity = await ClassActivity.findByIdAndUpdate(
//       id,
//       { $inc: { usedCapacity: -1 } },
//       { new: true }
//     ).populate("registeredUsers");

//     if (!updatedCapacity) {
//       console.log("ClassActivity not found or capacity not updated.");
//       return res.status(404).json({ message: "ClassActivity not found or capacity not updated." });
//     }

//     console.log("Updated Capacity:", updatedCapacity);
//     await updatedCapacity.save();

//     res.status(201).json(updatedCapacity);
//   } catch (error) {
//     console.error("Error in decreaseClassCapacityOnCancel:", error);
//     next(error);
//   }
// });

const getActivity = asyncWrapper(async (req, res, next) => {
  const { id } = req.params;

  const activity = await ClassActivity.findById(id).populate("registeredUsers");

  if (!activity) {
    throw new ErrorResponse(404, "notfound");
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

    const allActivities = await ClassActivity.find(query)
      .populate("registeredUsers")
      .sort({ date: -1, time: -1 });

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
  editClassActivity,
  cancelUserRegistration,
  // decreaseClassCapacityOnCancel,
};
