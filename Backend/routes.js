const express = require("express")
const router = express.Router()


router.get("/", (req,res) => {
    res.json({message:"get all data"})
})
router.get("/:id", (req,res) => {
    res.json({message:"get one data"})
})

router.get("/ping", (req,res) => {
    res.send("pong")
})

router.post("/create",(req,res) => {
    res.status(201).json({message:"GET a post request"})
})

router.put("/update",(req,res) => {
    res.status(200).json({"message":"GET a put request"})
})

router.delete("/remove",(req,res) => {
    res.status(200).json({"message":"Delete a request"})
})

module.exports = router