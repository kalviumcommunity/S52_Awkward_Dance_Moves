const express = require("express");
const router = express.Router();
const { dataModel, UserModel } = require('./Data');

router.get("/", (req, res) => {
  res.json({ message: "get all data" });
});

router.post("/createUser", (req , res) => {
  UserModel.create(req.body)
  .then(user => res.json(user))
  .catch(err => res.json(err))
})

router.get("/getEntites", (req, res) => {
    dataModel.find()
    .then((data) => res.json(data))
    .catch((err) => res.json(err));
});
router.post('/postEntities', (req, res) => {
  dataModel.create(req.body)
    .then(data => res.json(data))
    .catch(err => res.status(500).json({ error: err.message }));
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
