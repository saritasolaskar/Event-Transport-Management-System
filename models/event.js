const mongoose = require('mongoose');
const Schema=mongoose.Schema;

const eventSchema = new Schema({
    eventName: {
        type: String,  
        unique: true, 
    },
    start_date:{
        type: Date,
        required: true
    },
    end_date:{
        type: Date,
        required: true
    },
    status: {
        type: String,
        enum: ['Draft', 'Active', 'Completed'],
        default: 'Draft'
    },
    hotel_location:{
        type: String,
        required: true
    },
    venue_location:{
        type: String,
        required: true
    },
    Airport_location:{
        type: String,
        required: true          
    },

});


module.exports = mongoose.model("event", eventSchema);
