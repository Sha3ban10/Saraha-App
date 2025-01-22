const express = require("express");
const { connectToDB } = require("./dbConn/dbConnection");
const userRouter = require("./modules/userModule/user.router");
var session = require("express-session");
var MongoDBStore = require("connect-mongodb-session")(session);

var store = new MongoDBStore({
  uri: "mongodb://127.0.0.1:27017/MVC2",
  collection: "mySessions",
});
const app = express();
const port = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
    store,
  })
);
app.use("/", userRouter);

connectToDB;
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
