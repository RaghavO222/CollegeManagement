const mongoose = require('mongoose')

const Schema = mongoose.Schema

const attendenceModel = new mongoose.Schema({
    Subject:{
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true,
    },
    present: {
        type: String,
        required: true,
    },
    user_id: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Attendence',attendenceModel)