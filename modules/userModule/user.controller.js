const { error } = require("console");
const { userModel } = require("../../Models/userModel/userModel");
const { messageModel } = require("../../Models/MessageModel/messageModel");

exports.login = (req, res) => {
  res.render("login", { error: null });
};

exports.register = (req, res) => {
  res.render("register", { message: null, error: null });
};
exports.index = (req, res) => {
  res.render("index");
};

exports.handleRegister = async (req, res) => {
  const userExists = await userModel.findOne({ email: req.body.email });

  if (userExists) {
    return res.render("register", {
      error: "User Already Exists",
      message: null,
    });
  }

  const user = await userModel
    .create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    })
    .catch((err) => {
      return res.render("register", {
        message: null,
        error: "please enter valid details",
      });
    });

  return res.render("register", {
    message: "User Registered Successfully",
    error: null,
  });
};

exports.handleLogin = async (req, res) => {
  const user = await userModel.findOne({
    email: req.body.email,
    password: req.body.password,
  });
  if (!user) {
    return res.render("login", { error: "email or password is incorrect" });
  }

  req.session.user = user;
  req.session.isLoggedIn = true;

  return res.redirect(`/user/${user._id}`);
};

exports.user = (req, res) => {
  if (!req.session.isLoggedIn) {
    return res.redirect("/login");
  }
  const url = req.protocol + "://" + req.get("host") + req.originalUrl;
  res.render("user.ejs", { user: req.session.user, url });
};
exports.message = async (req, res) => {
  const messages = await messageModel.find({ userID: req.session.user._id });
  if (!req.session.isLoggedIn) {
    return res.redirect("/login");
  }
  const url =
    req.protocol + "://" + req.get("host") + "/user/" + req.session.user._id;

  res.render("message.ejs", { user: req.session.user, url, messages });
};

exports.logout = (req, res) => {
  if (req.session.isLoggedIn) {
    req.session.destroy(function (err) {
      res.redirect("/login");
    });
  }
};

exports.handleMessage = async (req, res) => {
  const { content } = req.body;
  const id = req.params.id;
  const message = await messageModel.create({ content, userID: id });
  return res.redirect(`/user/${req.session.user._id}`);
};
