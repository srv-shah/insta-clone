const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            unique: [true, "user already exists with this username."],
            required: [ true, "Username is required"]
        },
        email: {
            type: String,
            unique: [true, "user already exists with this Email."],
            required: [ true, "Email is required."]
        },
        password: {
            type: String,
            required: [ true, "password is required" ]
        },
        bio: String,
        profile_image: {
            type: String,
            default: "https://ik.imagekit.io/hnoglyswo0/avatar-gender-neutral-silhouette-vector-600nw-2470054311.webp"
        }
    }
)

const userModel = mongoose.model("users", userSchema);

module.exports = userModel;