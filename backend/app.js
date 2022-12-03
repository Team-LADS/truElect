/**
 * create an express server
 */
// require cors
const cors = require("cors")
    //require path 
const path = require("path");
//require express
const express = require('express');


//require database 
const { db } = require('./db/db');
//require env file
require('dotenv').config()
const PORT = process.env.PORT || 5000;

//require user routes
const userRoutes = require('./routes/userRoute');


//require user
const User = require('./model/userSchema')
    //initalize db
db();


//initailize app 
const app = express();
//set view engine 
// cors setup for express app
app.use(cors("*"));
//use body parser
app.use(express.json({limit: '50mb'}));



//use user routes
app.use('/user', userRoutes);

//listen to port 
app.listen(PORT, () => console.log(`server is up on port ${PORT}`))