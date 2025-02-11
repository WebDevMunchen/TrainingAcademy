const ErrorResponse = require("../utils/errorResponse.js");
const ActivityInterest = require("../models/activityInterest-model.js");
const asyncWrapper = require("../utils/asyncWrapper.js");
const cloudinary = require("cloudinary").v2;

const createInterest = asyncWrapper(async (req, res, next) => {
  const { title, description, tag, targetGroup, tookPlace } = req.body;

  // Ensure tag and targetGroup are parsed as arrays
  const parsedTags = typeof tag === "string" ? JSON.parse(tag) : tag || [];
  const parsedTargetGroups =
    typeof targetGroup === "string"
      ? JSON.parse(targetGroup)
      : targetGroup || [];

  // Upload the file to Cloudinary
  let previewPicture = null;
  if (req.file) {
    try {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "activity_interests", // Optionally specify a folder in Cloudinary
      });
      previewPicture = result.secure_url; // Cloudinary URL
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Error uploading image to Cloudinary", error });
    }
  }

  // Create the activity interest in your database
  const interest = await ActivityInterest.create({
    title,
    description,
    previewPicture,
    tag: parsedTags,
    targetGroup: parsedTargetGroups,
    tookPlace,
  });

  res.status(201).json(interest);
});

const editInterest = asyncWrapper(async (req, res, next) => {
  const { id } = req.params;
  let { title, description, tag, tookPlace, targetGroup } = req.body; // Include targetGroup

  const parsedTags = typeof tag === "string" ? JSON.parse(tag) : tag || [];
  const parsedTargetGroup =
    typeof targetGroup === "string"
      ? JSON.parse(targetGroup)
      : targetGroup || [];

  const existingInterest = await ActivityInterest.findById(id);
  if (!existingInterest) {
    throw new ErrorResponse(404, "Interest not found!");
  }

  let previewPicture = existingInterest.previewPicture;
  if (req.file) {
    try {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "activity_interests",
      });
      previewPicture = result.secure_url;
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Error uploading image to Cloudinary", error });
    }
  }

  const updatedInterest = await ActivityInterest.findByIdAndUpdate(
    id,
    {
      title,
      description,
      previewPicture,
      tag: parsedTags,
      targetGroup: parsedTargetGroup, // ✅ Add this line
      tookPlace,
    },
    { new: true, runValidators: true }
  );

  res.status(200).json(updatedInterest);
});

const deleteInterest = asyncWrapper(async (req, res, next) => {
  const { id } = req.params;

  const interest = await ActivityInterest.findByIdAndDelete(id);

  if (!interest) {
    throw new ErrorResponse(404, "Interest not found!");
  }

  res.status(200).json({ message: "success" });
});

const getInterest = asyncWrapper(async (req, res, next) => {
  const { id } = req.params;

  const interest = await ActivityInterest.findById(id).populate({path: 'interestedUsers.user'});

  if (!interest) {
    throw new ErrorResponse(404, "Interest not found!");
  }

  res.status(200).json(interest);
});

const getEveryInterest = asyncWrapper(async (req, res, next) => {
  const interest = await ActivityInterest.find({});

  res.status(200).json(interest);
});

const showInterest = asyncWrapper(async (req, res, next) => {
  const { id: classId } = req.params; // Extract classId from URL parameters
  const { id: userId } = req.user; // Extract userId from the authenticated user

  try {
    // Find the activity interest
    const activityInterest = await ActivityInterest.findById(classId);

    if (!activityInterest) {
      return res.status(404).json({ message: "Activity interest not found" });
    }

    // Check if user is already in the interestedUsers array
    const alreadyInterested = activityInterest.interestedUsers.some(
      (entry) => entry.user.toString() === userId
    );

    if (alreadyInterested) {
      return res
        .status(400)
        .json({ message: "User has already shown interest" });
    }

    // Add user with proper structure
    activityInterest.interestedUsers.push({
      user: userId, // Ensure the correct field name
      interestedAt: new Date(),
    });

    // Increment favCount
    activityInterest.favCount += 1;

    // Save the updated activity interest
    await activityInterest.save();

    // Return the updated activity interest object as response
    res.status(200).json(activityInterest);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error adding interest" });
  }
});

const markTookPlace = asyncWrapper(async (req, res, next) => {
  const { id } = req.params;

  // Find the activity
  const interest = await ActivityInterest.findById(id).populate(
    "interestedUsers.user"
  );

  if (!interest) {
    return res.status(404).json({ message: "Activity not found" });
  }

  if (interest.interestedUsers.length > 0) {
    interest.pastInterests.push({
      date: new Date(),
      users: interest.interestedUsers
        .filter((u) => u.user) // Filter out invalid entries
        .map((u) => ({
          user: u.user,
          interestedAt: u.interestedAt,
        })),
    });
  }

  // Update lastTookPlace, clear interestedUsers, and reset favCount
  interest.lastTookPlace = new Date();
  interest.interestedUsers = [];
  interest.favCount = 0; // Reset favCount

  // Save the changes
  await interest.save();

  res.status(200).json(interest);
});

module.exports = {
  createInterest,
  editInterest,
  getEveryInterest,
  deleteInterest,
  getInterest,
  showInterest,
  markTookPlace,
};
