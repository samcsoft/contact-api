const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: [true, "Username is required"],
        unique: [true, "username already exists"]
    },

    email: {
        type: String,
        required: [true, "email is required"],
        unique: [true, "email already exists"]
    },

    password: {
        type: String,
        required: [true, "password is required"]
    }
},
{
    timestamps: true
}
);

module.exports = mongoose.model("USer", userSchema);