const mongoose = require('mongoose');
const Schema=mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose").default;


const userschema = new Schema({
    email:{
        type:String,
        required:true,
    } ,
     
    role:{
        type:String,
        enum:["ADMIN","DRIVER","CLIENT"],
        required:true,
    }
      
});
userschema.plugin(passportLocalMongoose);

module.exports = mongoose.model("user", userschema);
