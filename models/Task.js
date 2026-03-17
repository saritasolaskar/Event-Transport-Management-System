const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({

driver:{
type:mongoose.Schema.Types.ObjectId,
ref:"driver_details"
},

event:{
type:mongoose.Schema.Types.ObjectId,
ref:"event"
},

assignedAt:{
type:Date,
default:Date.now
}

});

module.exports = mongoose.model("Task",taskSchema);