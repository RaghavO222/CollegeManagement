const User =  require('../model/userModel')
const jwt = require('jsonwebtoken')

const createToken = (_id) => {
    return jwt.sign({_id},process.env.SECRET,{expiresIn:'200d'})
}

const loginUser = async(req,res) => {
    const {username,password} = req.body

    try{
        const user = await User.login(username,password)

        const token = createToken(user._id,user.type)

        res.status(200).json({username,token,type:user.type})
    }catch(error){
        res.status(400).json({error:error.message})
    }
}

const signupUser = async(req,res) => {
    const {username,email,password,type} = req.body

    try{
        const user = await User.signup(username,email,password,type)

        // const token = createToken(user._id,user.type)

        //res.status(200).json({email,token,type:user.type})
        const token = createToken(user._id)
        res.status(200).json({email,token})
    }catch(error){
        res.status(400).json({error:error.message})
    }
}

const getUser = async(req,res) => {
    try{
        const user = await User.find();
        res.status(200).json(user)
    }catch(error){
        res.status(400).json({error:error.message})
    }
    
}

const sepUser = async(req,res) => {
    try{
        const {username} = req.params
        const user = await User.findOne({username});
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json(user)
    }catch(error){
        res.status(400).json({error:error.message})
    }
}

module.exports = {getUser,loginUser,signupUser,sepUser}