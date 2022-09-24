const express = require('express');
const router = express.Router();
const userModel = require('../models/User.model');
const createError = require('http-errors');
const { authSchema } = require('../helpers/validation_schema')


router.post('/register', async (req,res,next)=>{
    console.log(req.body);
    try {
        // const {email, password} = req.body;
        const result = await authSchema.validateAsync(req.body);
        
        //to check without using joi
        // if(!email || !password) throw createError.BadRequest()

        const doesExist = await userModel.findOne({email : result.email})
        if(doesExist) throw createError.Conflict(`${result.email} is already existed`);
        const user = new userModel(result);
        const savedUser = await user.save();
        res.send(savedUser);
    } catch (error) {
        if(error.isJoi === true) error.status=422
        next(error);
    }
});

router.post('/login', async (req,res,next)=>{
    res.send('login router');
});

router.post('/refresh-token', async (req,res,next)=>{
    res.send('refresh router');
});

router.delete('/logout', async (req,res,next)=>{
    res.send('logout router');
});

module.exports = router;