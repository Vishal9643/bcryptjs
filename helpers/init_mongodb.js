const mongoose = require('mongoose');
// require('dotenv').config();

const dbConnection = mongoose.connect(process.env.MONGODB_URI,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    // useFindAndModify:true,
    // useCreateIndex:true
}).then(()=>{
    console.log('Connection Established')
}).catch((err)=>{
    console.log(`error: ${err}`);
});

mongoose.connection.on('connected',()=>{
    console.log('mongoose is connected with the database');
});

mongoose.connection.on('error',(err)=>{
    console.log(`error occured : ${err}`);
});

mongoose.connection.on('disconnected',()=>{
    console.log('mongoose is not connected to the database');
});

process.on('SIGINT',async ()=>{
    await mongoose.connection.close();
    process.exit(0);
})

module.exports = dbConnection;