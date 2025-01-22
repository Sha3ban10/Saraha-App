const { default: mongoose } = require("mongoose");
const { user } = require("../../modules/userModule/user.controller");

const messageSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

exports.messageModel = mongoose.model("Message", messageSchema);
