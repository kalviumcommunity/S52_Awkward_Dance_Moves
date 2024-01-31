const express = require('express')
const app = express()

app.get('/ping' , (req, res) => {
    res.send("port")
})


app.listen(3000, () => {
    console.log("this server is running in 3000") 
})