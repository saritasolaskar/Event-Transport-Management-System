const express = require("express");
const router = express.Router();

 

//passport setup
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const user = require("../models/user");


router.post("/login", passport.authenticate("local", {
    failureRedirect: "/login",
    failureFlash:true  // set true if using flash 
  }),
  
  (req, res) => {
    console.log("User authenticated:", req.user.username);
    console.log("Role:", req.user.role);

    if (req.user.role === "ADMIN") {
      return res.redirect("/admin/admindashboard");
    }

    if (req.user.role === "DRIVER") {
      return res.redirect("/driver/driverdashboard");
    }

    if (req.user.role === "CLIENT") {
      return res.redirect("/client/clientdashboard");
    }

    
  }
);
module.exports = router;