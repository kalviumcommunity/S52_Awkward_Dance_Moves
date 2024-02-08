const mongoose = require('mongoose')


const DataSchema = new  mongoose.Schema({
    imageUrl: String
})


const dataModel = mongoose.model("dance_moves" , DataSchema)

module.exports = dataModel