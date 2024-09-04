const mongoose = require('mongoose')

const Schema = mongoose.Schema

const markSchema = new mongoose.Schema ({
    Subject:{
        type: String,
        required: true
    },
    Test:{
        type: Number,
        required: true
    },
    Seminar:{
        type: Number,
        required: true
    },
    Attendence:{
        type: Number,
        required: true
    },
    Assignment:{
        type: Number,
        required: true
    },
    user_id: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Mark',markSchema)