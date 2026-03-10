const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
    driver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Driver"
    },
    event: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Event"
    },
    status: {
        type: String,
        default: "assigned"
    },
    assignedAt:{
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Task", taskSchema);