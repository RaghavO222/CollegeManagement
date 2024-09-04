const Subject = require('../model/subjectModel')
const mongoose = require('mongoose')

const getSubs = async (req,res) => {

    try{
        const sb = await Subject.find()

        if(!sb){
            return res.status(404).json({ error: 'Subject not found' });
        }

        res.status(200).json({sb})
    }catch(error){
        res.status(500).json({ error: 'An error occurred while fetching the subject' });
    }
}

module.exports = {getSubs}