const Mark = require('../model/markModel')
const mongoose = require('mongoose')

const getMarks = async (req,res) => {
    try{
        const user_id = req.user._id
        const marks = await Mark.find({user_id})
        res.status(200).json(marks)
    }catch(error){
        res.status(400).json({error:error.message})
    }    
}

const createMarks = async (req,res) => {
    const {Subject,Test,Seminar,Attendence,Assignment,user_id} = req.body;

    try{
        const marks = await Mark.create({Subject,Test,Seminar,Attendence,Assignment,user_id})
        res.status(200).json(marks)
    }catch(error){
        res.status(400).json({error:error.message})
    }
    
}

module.exports = {
    getMarks,
    createMarks
}