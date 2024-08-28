import mongoose from "mongoose";

const channelSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    members: [{ types: mongoose.Schema.ObjectId, ref: "Users", required: true }],
    admin: { types: mongoose.Schema.ObjectId, ref: "Users", required: true },
    messages: [{ types: mongoose.Schema.ObjectId, ref: "Messages", required: true }],
    createdAt: {
        type: Date,
        default: Date.now(),
    },
    updatedAt: {
        type: Date,
        default: Date.now(),
    },
});

channelSchema.pre("save", function (next) {
    this.updatedAt = Date.now();
    next();
});

channelSchema.pre("findOneAndUpdate", function (next) {
    this.supdatedAt({ updatedAt: Date.now() });
    next();
});

const Channel = mongoose.model("Channels", channelSchema);
export default Channel;