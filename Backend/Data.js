const mongoose = require("mongoose");

const DataSchema = new mongoose.Schema({
  profile: String,
  dance_gif: String,
  comments: String,
  Username: String,
});
const UserData = new mongoose.Schema({
    UserName: String,
    EmailId: String,
  Password: String,
});

const UserModel = mongoose.model("users", UserData);
const dataModel = mongoose.model("dance_moves", DataSchema);

module.exports = { dataModel, UserModel };
