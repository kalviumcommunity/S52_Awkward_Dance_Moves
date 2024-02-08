const express = require("express");
const router = express.Router();
const dataModel = require("./Data");

router.get("/", (req, res) => {
  res.json({ message: "get all data" });
});

router.get("/getEntites", (req, res) => {
dataModel.find()
    .then((data) => res.json(data))
    .catch((err) => res.json(err));
});

router.get("/ping", (req, res) => {
  res.send("pong");
});

router.post("/", (req, res) => {
  res.status(201).json({ message: "GET a post request" });
});

router.put("/", (req, res) => {
  res.status(200).json({ message: "GET a put request" });
});

router.delete("/", (req, res) => {
  res.status(200).json({ message: "Delete a request" });
});

module.exports = router;
