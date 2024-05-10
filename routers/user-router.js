const express = require("express");

const {
  createUser,
  login,
  logout,
  getProfile,
  getAllUsers,
  updateClassStatus,
  updateAttended,
  updateNotAttended,
  getUserInformation,
  updateUser
} = require("../controllers/user-controller");

const { authenticate, authorize } = require("../middlewares/authentication");

const userRouter = express.Router();


userRouter.route("/register").post(createUser);
userRouter.route("/login").post(login);
userRouter.route("/logout").post(logout);
userRouter.route("/profileInformation/:id").get(authenticate, getUserInformation);
userRouter.route("/profileInformation/update/:id").put(authenticate, updateUser)
userRouter.route("/profile").get(authenticate, getProfile);
userRouter.route("/getAllUsers").get(authenticate, getAllUsers);
userRouter.route("/updateClassStatus/:id").put(updateClassStatus)
userRouter.route("/updateAttended/:id").put(updateAttended)
userRouter.route("/updateNotAttended/:id").put(updateNotAttended)

module.exports = userRouter;
