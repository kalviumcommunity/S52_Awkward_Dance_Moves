const express = require("express");
const router = express.Router();
const { dataModel, UserModel } = require("./Data");
const {validateSignup} = require('./JoiSchema/user')
router.get("/", (req, res) => {
  res.json({ message: "get all data" });
});

router.post("/createUser", validateSignup, (req, res) => {
  UserModel.create(req.body)
    .then((user) => res.json(user))
    .catch((err) => res.status(400).json({ error: err.message }));
});

router.get("/getEntites", (req, res) => {
  dataModel
    .find()
    .then((data) => res.json(data))
    .catch((err) => res.json(err));
});
router.delete('/deleteEntites/:id', (req, res) => {
  const id = req.params.id;
  dataModel.findByIdAndDelete(id)
    .then(deletedEntity => res.json(deletedEntity)) // Return the deleted entity
    .catch(err => res.json(err));
});

router.get("/getEntites/:id", (req, res) => {
  const id = req.params.id;
  dataModel
    .findById(id) // Remove the curly braces around id
    .then((data) => res.json(data))
    .catch((err) => res.json(err));
});
router.put("/updateEntities/:id", (req, res) => {
  const id = req.params.id;
  dataModel
    .findByIdAndUpdate({_id:id} , {
      Username: req.body.Username ,
       dance_gif: req.body.dance_gif , 
       profile : req.body.profile,
       comments: req.body.comments
    }) // Remove the curly braces around id
    .then((data) => res.json(data))
    .catch((err) => res.json(err));
});

router.post("/postEntities", (req, res) => {
  dataModel
    .create(req.body)
    .then((data) => res.json(data))
    .catch((err) => res.status(500).json({ errovr: err.message }));
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
