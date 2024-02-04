const express = require('express')
const app = express()
const {ConnecttoDB,disconnecttoDB, isConnected}= require('./db')

app.get('/ping' , (req, res) => {
    res.json({message:"Pong"})
})

app.get('/', (req , res) => {
    if(isConnected){
        res.json({connection_state: "connected"})
    }else{
        res.json({connection_state: "disconnected"})
    }
})

app.listen(3000, () => {
    ConnecttoDB()
    console.log("this server is running in 3000") 
})