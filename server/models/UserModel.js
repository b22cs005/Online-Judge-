const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    email: {
        type:String,
        default:null,
        required: [true, "Your email address is required"],
        unique:true,
    },
    username: {
        type: String,
        default:null,
        required: [true, "Your username is required"],
    },
    password: {
        type: String,
        required: [true, "Your password is required"],
    },
    solvedProblems: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Problem' }]

});

userSchema.pre("save", async function (next) {
    if (!this.isModified('password')) return next();  
    try {
      const salt = await bcrypt.genSalt(12);
      this.password = await bcrypt.hash(this.password, salt);
      next();
    } catch (error) {
      next(error);
    }
  });
  
module.exports = mongoose.model("User", userSchema);