const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
// const Sequelize = require('sequelize')

// const db = require('../config')

const userSchema = new mongoose.Schema({
    fullname : {
        type : String,
        required: true,
    },
    username: {
        type : String,
        unique : true,
    },
    password : {
        type : String,
        required: true,
    },
    age : {
        type : Number, 
        required: false,
    },
    phoneNo : {
        type: Number,
        required : true,
    },
    email : {
        type: String,
        required : true,
        unique: true,
    },
    role : {
        type : String,
        enum : ['User', 'Admin'],
        required : true,
    },
    salary : {
        type: Number,
        required: false,
    },
    address : {
        type : String,
        required : true,
    },
    
});

// const userSchema = db.define('user',{
//     fullname : {
//                 type : Sequelize.STRING,
//                 required: true,
//             },
//             username: {
//                 type : Sequelize.STRING,
//                 unique : true,
//             },
//             password : {
//                 type : Sequelize.STRING,
//                 required: true,
//             },
//             age : {
//                 type : Sequelize.NUMBER, 
//                 required: false,
//             },
//             phoneNo : {
//                 type: Sequelize.NUMBER,
//                 required : true,
//             },
//             email : {
//                 type: Sequelize.STRING,
//                 required : true,
//                 unique: true,
//             },
//             role : {
//                 type : Sequelize.STRING,
//                 enum : ['User', 'Admin'],
//                 required : true,
//             },
//             salary : {
//                 type: Sequelize.NUMBER,
//                 required: false,
//             },
//             address : {
//                 type : Sequelize.STRING,
//                 required : true,
//             },
// })


userSchema.pre('save', async function(next){

    const user = this;
    //hash the password only if it has been modified or it is new 
    if(!user.isModified('password')) return next();
    try{
        // hash password generation
        const salt = await bcrypt.genSalt(10) 
        
        const hashedPassword = await bcrypt.hash(user.password, salt);

        user.password = hashedPassword;
        next();

    }
    catch(err){
      return next(err);
    }
})

userSchema.methods.comparePassword = async function(candidatePassword){
    try{

        //using bcrypt to check whther the password entered by user is matching with the records or not
        const isMatch = await bcrypt.compare(candidatePassword, this.password);
        return isMatch;
    }
    catch(err){
        throw err;
    }
}

const user  = mongoose.model('user', userSchema);

module.exports = user;