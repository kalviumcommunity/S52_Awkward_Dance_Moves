const mongoose = require("mongoose");

const DataSchema = new mongoose.Schema({
  dance_gif: String,
  comments: String,
  email: String,
});
const UserData = new mongoose.Schema({
  firstName: String,
  lastName: String,
  userName: String,
  email: String,
  password: String,
  location: String,
  profile: { data: Buffer, contentType: String },
  bio: String,
});

const UserModel = mongoose.model("users", UserData);
const dataModel = mongoose.model("dance_moves", DataSchema);

module.exports = { dataModel, UserModel };
