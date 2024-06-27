const User = require('../models/UserModel');
const { createSecretToken } = require('../util/SecretToken');
const bcrypt = require('bcryptjs');
const passport = require("passport");
const googleUser = require('../models/googleusermodel');

module.exports.SignUp = async (req, res, next) => {
    try {
        const { username, password, cnf_password, email } = req.body;
        const errors = {};

        // Check if all data has been provided
        if (!username || !password || !cnf_password || !email) {
            errors.message = "Please enter all the information!";
            return res.status(400).json({ errors });
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            errors.message = "Please enter a valid email address!";
            return res.status(400).json({ errors });
        }

        // Validate password format
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
        if (!passwordRegex.test(password)) {
            errors.message = "Password must be at least 6 characters long and include uppercase and lowercase letters, a number, and a special character.";
            return res.status(400).json({ errors });
        }

        // Check if password matches
        if (password !== cnf_password) {
            errors.message = "Passwords do not match!";
            return res.status(400).json({ errors });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            errors.message = "User already exists";
            return res.status(400).json({ errors });
        }

        const user = await User.create({ email, username, password });
        const token = createSecretToken(user._id);
        user.token = token;
        user.password = undefined;
        res.status(201).json({ message: "You have successfully registered",success:true, user });
        next();
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

module.exports.LogIn = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const errors = {};

        // Check if all data has been provided
        if (!password || !email) {
            errors.message = "Please enter all the information!";
            return res.status(400).json({ errors });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            errors.message = "Email Address is not valid!";
            return res.status(400).json({ errors });
        }

        // Find user in database
        const user = await User.findOne({ email });
        if (!user) {
            errors.message = "User not found";
            return res.status(404).json({ errors });
        }

        const auth = await bcrypt.compare(password, user.password);
        if (!auth) {
            errors.message = "Password is incorrect";
            return res.status(404).json({ errors });
        }

        const token = createSecretToken(user._id);
        user.token = token;
        user.password = undefined;
        // Store token in cookies with options
        const options = {
            expires: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
            //httpOnly: true,
            secure: true,
            sameSite: 'None',

        };
        // Send token
        res.status(200).cookie("token", token, options).json({
            message: "You have successfully logged in",
            success: true,
            token,
        });
        next();
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

module.exports.googleLogin = passport.authenticate("google", { scope: ["profile", "email"] });

module.exports.googleCallback = passport.authenticate("google", {
  failureRedirect: "https://www.codehack.me/",
  successRedirect: "https://www.codehack.me/", 
});

module.exports.G_Login_succ = async(req,res) => {
    if(req.user){
        res.status(200).json({message:"User Login",user:req.user});
    }
    else{
        res.status(400).json({message:"Not Authorized"});
    }
}
module.exports.G_Logout = async(req,res,next) => {
    req.logout(function(err){
      if(err){return next(err)}
      res.redirect("https://www.codehack.me/");
    })
}


module.exports.UserProfile = async (req, res) => {
  const { userId } = req.body;

  try {
    let user = await User.findById(userId).populate('solvedProblems', 'title');
    if (!user) {
        user = await googleUser.findById(userId).populate('solvedProblems','title');
          if (!user) {
            errors.message = "No such user exists";
            return res.status(400).json({ errors });
          }
       }
    res.status(200).json({ success: true, user });
  } catch (error) {
    console.error("Error fetching user profile:", error);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};

module.exports.UserLogout = (req, res) => {
    try{
              res.clearCookie("token",{
                sameSite: 'None',
                secure: true,
              });
              res.status(200).send({
                        message: "You have successfully logged out!",
                        success: true,
              });
    } catch(error){
              console.log(error.message);
    }
}
