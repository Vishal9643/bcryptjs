const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
        lowercase:true,
        unique:true
    },
    password:{
        type:String,
        required:true        
    }
});

const userModel = mongoose.model('users',Schema);

module.exports = userModel;