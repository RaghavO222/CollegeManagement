const mongoose = require('mongoose')
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema

const userModel = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    }
})

userModel.statics.signup = async function(username,email, password,type) {
    if(!email){
        throw Error("email must be filled")
    }
    if(!password){
        throw Error("password must be filled")
    }
    if(!type){
        throw Error("type must be filled")
    }
    if(!username){
        throw Error("username must be filled")
    }

    const exist = await this.findOne({ email });
    const existus = await this.findOne({ username });

    if (exist) {
        throw new Error("Email already exists");
    }
    if(existus){
        throw new Error("Username already exists");
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const user = await this.create({ username,email, password: hash,type });

    return user;
};

userModel.statics.login = async function(username,password){
    if(!username || !password){
        throw Error("All fields must be filled")
    }

    const user = await this.findOne({ username });

    if (!user) {
        throw new Error("Incorrect username");
    }

    const match = await bcrypt.compare(password,user.password)

    if(!match){
        throw Error("Incorrect password")
    }

    return user
}

module.exports = mongoose.model('User',userModel)