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
  updateUser,
  updatePassword,
  markRead,
  deleteMessage,
  markNotRead,
} = require("../controllers/user-controller");

const { authenticate } = require("../middlewares/authentication");

const userRouter = express.Router();

userRouter.route("/markRead/:id").put(authenticate, markRead);
userRouter.route("/markNotRead/:id").put(authenticate, markNotRead);
userRouter.route("/deleteMessage/:id").delete(authenticate, deleteMessage);
userRouter.route("/register").post(authenticate, createUser);
userRouter.route("/login").post(login);
userRouter.route("/logout").post(logout);
userRouter.route("/updatePassword/:id").put(authenticate, updatePassword);
userRouter
  .route("/profileInformation/:id")
  .get(authenticate, getUserInformation);
userRouter
  .route("/profileInformation/update/:id")
  .put(authenticate, updateUser);
userRouter.route("/profile").get(authenticate, getProfile);
userRouter.route("/getAllUsers").get(authenticate, getAllUsers);
userRouter.route("/updateClassStatus/:id").put(authenticate, updateClassStatus);
userRouter.route("/updateAttended/:id").put(authenticate, updateAttended);
userRouter.route("/updateNotAttended/:id").put(authenticate, updateNotAttended);

module.exports = userRouter;
