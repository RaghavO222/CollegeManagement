const attendence = require('../model/attendenceModel')
const mongoose = require('mongoose')

const getAtt = async(req,res) => {
    const dateP = new Date(req.params.date)

    if(isNaN(dateP.getTime())){
        return res.status(400).json({ message: 'Invalid date format' });
    }

    try{
        const user_id = req.user._id
        const att = await attendence.find({date:dateP,user_id: user_id})
        res.status(200).json(att)
    }catch(error){
        res.status(400).json({error:error.message})
    }
    
}

const addAtt = async(req,res) => {
    const {Subject,date,present,user_id} = req.body;
    const att = await attendence.create({Subject,date,present,user_id})
    res.status(200).json(att)
}

module.exports = {
    getAtt,
    addAtt
}