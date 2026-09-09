const mongoose = require("mongoose");

const dustbinSchema = new mongoose.Schema({
    dustbinId: {
        type: String,
        required: true,
        unique: true
    },

    area: {
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
        default: "normal"
    }
});

const Dustbin = mongoose.model("Dustbin", dustbinSchema);

module.exports = Dustbin;