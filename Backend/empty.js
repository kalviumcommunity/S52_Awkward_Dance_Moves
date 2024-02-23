// Importing required modules
const mongoose = require("mongoose");
const express = require("express");
require("dotenv").config(); // Loading environment variables from .env file
const bcrypt = require("bcrypt");

// Creating an instance of Express Router
const MDrouter = express.Router();

// Importing Mongoose models
const { UserModel } = require("../modules/MDSchema");

// Function to start the database connection
const startDatabase = async () => {
  try {
    // Connecting to MongoDB using the URI from environment variables
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");
  } catch (error) {
    // Handling connection error
    console.error("Error connecting to MongoDB:", error.message);
  }
};

// Function to stop the database connection
const stopDatabase = async () => {
  try {
    // Disconnecting from MongoDB
    await mongoose.disconnect();
    console.log("Disconnected from MongoDB");
  } catch (error) {
    // Handling disconnection error
    console.error("Error disconnecting from MongoDB:", error.message);
  }
};

// Function to check if the database is connected
const isConnected = () => {
  // Checking if the connection state is equal to 1 (connected)
  return mongoose.connection.readyState === 1;
};

const validateEmail = async (email) => {
  try {
    // Check if there is a user with the provided email
    const user = await UserModel.findOne({ email: email });
    // If user exists, return true; otherwise, return false

    return !!user;
  } catch (error) {
    // Handle error
    console.error("Error validating email:", error.message);
    // Return false in case of error
    return false;
  }
};

const validatePassword = async (pass, email) => {
  try {
    // Check if there is a user with the provided email
    const user = await UserModel.findOne({ email: email });
    console.log(user);
    // Use bcrypt's compare function to compare the plain password with the hashed password
    const match = await bcrypt.compare(pass, user.password);

    // Return true if the password matches the hashed password, false otherwise
    return match;
  } catch (error) {
    console.error(error);
    // Handle any errors gracefully
    return false;
  }
};

// Exporting functions and router for use in other modules
module.exports = {
  startDatabase,
  stopDatabase,
  isConnected,
  validateEmail,
  validatePassword,
  MDrouter,
};

Auth.post("/signin", async (req, res) => {
    try {
      const passwordStatus = await validatePassword(
        req.body.password,
        req.body.email,
      );
      if (passwordStatus) {
        res.status(200).json({ vaildate: true, message: "Welcome" });
      } else {
        res
          .status(200)
          .json({ vaildate: false, message: "Email/Password not matching" });
      }
    } catch (error) {
      console.error("Error during signin:", error);
      res.status(500).json({ success: false, message: "Internal server error" });
    }
  });