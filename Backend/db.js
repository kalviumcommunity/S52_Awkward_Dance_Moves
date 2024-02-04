const mongoose = require("mongoose");
require("dotenv").config();
const ConnecttoDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.Mongoose_URI);
    console.log("connected to mongoose");
  } catch (err) {
    console.log("❌ error connecting to mongoDB:", err.message);
  }
};

const disconnecttoDB = async () => {
  try {
    await mongoose.disconnect();
    console.log("📦 disconnected from mongoDB");
  } catch {
    console.error("❌ error disconnecting from mongoDB:", err.message);
  }
};

const isConnected = () => {
  return mongoose.connection.readyState === 1;
};

module.exports = {
  ConnecttoDB,
  disconnecttoDB,
  isConnected,
  mongooseConnection: mongoose.connection,
};
