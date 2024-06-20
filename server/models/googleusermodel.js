const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    googleId:{
        type:String,
    },
    email: {
        type:String,
    },
    displayName: {
        type: String,
    },
    solvedProblems: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Problem' }],
    role:{
        type:String,
        default:"user",
      }
});

module.exports = mongoose.model("googleuser", userSchema);