const DeletedClassActivity = require("../models/deletedClassActivity-model.js");
const asyncWrapper = require("../utils/asyncWrapper.js");

const getAllDeletedActivities = asyncWrapper(async (req, res, next) => {
  const allActivities = await DeletedClassActivity.find({})
    .populate("registeredUsers")
    .sort({ date: -1, time: -1 });

  res.json(allActivities);
});

module.exports = {
  getAllDeletedActivities,
};
