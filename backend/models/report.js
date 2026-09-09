const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema({
    citizenId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    dustbinId: {
        type: String,
        required: true
    },

    photo: {
        type: String,
        required: true
    },

    latitude: {
        type: Number,
        required: true
    },

    longitude: {
        type: Number,
        required: true
    },

    status: {
        type: String,
        default: "pending"
    },

    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Report = mongoose.model("Report", reportSchema);

module.exports = Report;