const mongoose = require('mongoose')

const Schema = mongoose.Schema

const subjectModel = new mongoose.Schema({
    Subject:{
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Subject',subjectModel)