/**
 * create a user model
 * 
 */
//require mongoose
// const Schema = require('mongoose').Schema();
const mongoose = require('mongoose');
    //get schema 
const { Schema } = mongoose;

const userSchema = new Schema({
        walletAddress: {
            type: String,
            required: false,
            unique:true
        },
        cid: {
            type: String,
            required: true,
            unique: true
        },
        cidLink: {
            type: String,
            required: true,
            unique: true
        },
        isVerified: {
            type: Boolean,
            required:true,
            default: false
        },
        votersIDNO:{
            type:String,
            required:false
        },
        isAdmin:{
            type:Boolean,
            default:false
        }
      
    },{
        timestamps: true
    })

const User = mongoose.model('user', userSchema);
module.exports = User;