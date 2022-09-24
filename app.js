const express = require('express');
const morgan = require('morgan');
const createError = require('http-errors');
require('dotenv').config(); 
const dbConnection = require('./helpers/init_mongodb');

const AuthRoute = require('./routes/auth.route')

const PORT = process.env.PORT;
const app = express();

app.use(express.json());

app.use(morgan('dev'));
app.use('/Auth',AuthRoute);


app.get('/',(req,res)=>{
    console.log(`hello from express`);
});


app.use(async (req,res,next)=>{
    // const error = new Error('Not Found');
    // error.status = 404;
    // next(error);
    next(createError.NotFound());
});

app.use((err,req,res,next)=>{
    res.status(err.status || 500),
    res.send({
        error:{
            status:(err.status || 500),
            message: err.message
        }
    })
})

app.listen(PORT,()=>{
    console.log(`listening on port ==>>> ${PORT}`);
})