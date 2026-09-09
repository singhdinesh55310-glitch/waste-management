const mongoose = require("mongoose");

const wasteReportSchema = new mongoose.Schema({

    citizenId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    photo: {
        type: String,
        required: true
    },

    wasteType: {
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

const WasteReport = mongoose.model("WasteReport", wasteReportSchema);

module.exports = WasteReport;