const { default: mongoose } = require("mongoose");

exports.connectToDB = mongoose
  .connect("mongodb://127.0.0.1:27017/MVC2")
  .then(() => {
    console.log("Connected");
  })
  .catch((err) => {
    console.log(err);
  });
