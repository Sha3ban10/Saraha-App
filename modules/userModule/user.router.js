const { Router } = require("express");
const {
  index,
  register,
  login,
  handleLogin,
  handleRegister,
  user,
  message,
  logout,
  handleMessage,
} = require("./user.controller");

const userRouter = Router();

userRouter.get("/", index);

userRouter.get("/register", register);
userRouter.get("/login", login);
userRouter.post("/handleregister", handleRegister);
userRouter.post("/handleLogin", handleLogin);
userRouter.get("/user/:id", user);
userRouter.get("/messages", message);
userRouter.get("/logout", logout);
userRouter.post("/handleMessage/:id", handleMessage);

module.exports = userRouter;
