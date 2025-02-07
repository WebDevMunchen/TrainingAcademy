const ErrorResponse = require("../utils/errorResponse.js");
const ActivityInterest = require("../models/activityInterest-model.js");
const asyncWrapper = require("../utils/asyncWrapper.js");
const cloudinary = require("cloudinary").v2;

const createInterest = asyncWrapper(async (req, res, next) => {
  const { title, description, favCount, tag, targetGroup, tookPlace } =
    req.body;

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
    favCount,
    tag: parsedTags,
    targetGroup: parsedTargetGroups,
    tookPlace,
  });

  res.status(201).json(interest);
});

const editInterest = asyncWrapper(async (req, res, next) => {
  const { id } = req.params;
  let { title, description, favCount, tag, tookPlace, targetGroup } = req.body; // Include targetGroup

  const parsedTags = typeof tag === "string" ? JSON.parse(tag) : tag || [];
  const parsedTargetGroup =
    typeof targetGroup === "string" ? JSON.parse(targetGroup) : targetGroup || [];

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
      favCount,
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

  const interest = await ActivityInterest.findById(id);

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
    // Find the activity interest and add the user to the interestedUsers array if not already present
    const activityInterest = await ActivityInterest.findById(classId);
    
    if (!activityInterest) {
      return res.status(404).json({ message: "Activity interest not found" });
    }

    // Check if user is already in the interestedUsers array
    if (activityInterest.interestedUsers.includes(userId)) {
      return res.status(400).json({ message: "User has already shown interest" });
    }

    // Add userId to the interestedUsers array
    activityInterest.interestedUsers.push(userId);

    // Save the updated activity interest
    await activityInterest.save();

    // Return the updated activity interest object as response
    res.status(200).json(activityInterest);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error adding interest" });
  }
});


module.exports = {
  createInterest,
  editInterest,
  getEveryInterest,
  deleteInterest,
  getInterest,
  showInterest
};
