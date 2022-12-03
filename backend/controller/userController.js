//require user model
const User = require('../model/userSchema');
//require random string
const randomString = require('randomstring');

//post fetch user handler
module.exports.getUser = async(req, res) => {
    const { walletAddress } = req.body;
    console.log(req.body)
    try {
        //fetch the user with corresponding address
        const user = await User.findOne({ walletAddress });
        //check if there is no user
        if (!user) return res.status(404).json({ message: `${walletAddress} is not a register user; Please sign up` });
        return res.status(200).json({ message: ' User Fetched Successfully', payload: user });

    } catch (error) {
       res.status(500).json({ message: error.message })
    }

};

//post create user handler
module.exports.createUser = async(req, res) => {
    const { walletAddress,cid,cidLink } = req.body;

    try {
        const userExist = await User.findOne({ walletAddress });
        //check if there is no user
        if (userExist) return res.status(422).json({ message: `${walletAddress} already exist ` });
        //create user 
        const user = await User.create({
            walletAddress,cid,cidLink
        });
    
        res.status(200).json({ message: " Your account was created successfully"});
    } catch (error) {
       res.status(500).json({ message: error.message })
    }


};



module.exports.userVerification = async(req,res)=>{
    try {

        const {walletAddress} =req.body;
        let user = await User.findOne({walletAddress});
         //check if there is no user
         if (!user) return res.status(404).json({ message: `${walletAddress} does not exist ` });
        //check if user is already verified
        if (user.isVerified) return res.status(422).json({ message: `${walletAddress} is already Verified ` });
         //generate voters identification id
         let votersIDNO = randomString.generate({
            charset:"alphanumeric",
            length:20
        }).toUpperCase();

        //update isVerified 
        await User.findOneAndUpdate({walletAddress},{isVerified:true,votersIDNO},{new:true,runValidators:true});

        res.status(200).json({message:"Account was verified Successfully, Please Login."});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

module.exports.isAdmin = async(req,res,next)=>{
    try {

        const {callerAddress} =req.body;
        let user = await User.findOne({callerAddress});
         //check if there is no user
         if (!user) return res.status(404).json({ message: `${callerAddress} does not exist ` });
         //check if user is admin
         if (!user.isAdmin) return res.status(404).json({ message: `${callerAddress} is not Authorized` });
         next()
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

