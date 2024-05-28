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
});

module.exports = mongoose.model("googleuser", userSchema);