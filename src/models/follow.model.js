const mongoose = require('mongoose');
const { applyTimestamps } = require('./post.model');

const followSchema = new mongoose.schema({
    follower: {
        type: mongoose.schema.Types.objcetId,
        ref: "users",
        required: [true, "follower is required"]
    },
    followee: {
        type: mongoose.schema.Types.objectId,
        ref: "users",
        required: [true, "followee is required"]
    }
}, { thisimestamps: true });


//To prevent: User A follows User B multiple times
followSchema.index({ follower: 1, followee: 1}, { unique: true });


const followModel = mongoose.model("follows", followSchema);

module.exports = followModel;