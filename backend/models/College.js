const mongoose = require("mongoose");

const CollegeSchema = new mongoose.Schema({
    institute: {
        type: String,
        required: true,
    },
    program: {
        type: String,
        required: true,
    },
    quota: {
        type: String,
        required: true,
    },
    seat_type: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        required: true,
    },
    opening_rank: {
        type: Number,
        required: true,
    },
    closing_rank: {
        type: Number,
        required: true,
    },
});

module.exports = mongoose.model("College", CollegeSchema);
