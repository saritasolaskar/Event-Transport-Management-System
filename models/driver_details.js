const mongoose = require('mongoose');
const Schema=mongoose.Schema;


const driver_detailschema = new Schema({
  user:{
    type: Schema.Types.ObjectId,
    ref: "user",
    required: true  
  },
  phone: {
    type: String,
    required: true
  },
  licenseNumber: {
    type: String,
    required: true
  },
  vehicleType: {
    type: String,
    required: true
  },
  vehicleNumber: {
    type: String,
    required: true
  }
      

});


module.exports = mongoose.model("driver_details", driver_detailschema);
