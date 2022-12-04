//require express router
const router = require('express').Router();

//require function from user controller
const {getUser,createUser,userVerification,isAdmin} = require('../controller/userController');


//routes

//user profile routes
router.post('/profile',getUser);

//create user
router.post('/register',createUser);

//verify user
//caller is an admin
router.post('/verify',isAdmin,userVerification);

module.exports=  router;