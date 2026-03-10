 const express = require("express");
const router = express.Router();
const driver_details = require("../models/driver_details");

router.get("/", (req, res) => {
    res.send("admin/home");
});


router.get("/driverdashboard", async(req, res) => {
    if (!req.isAuthenticated() || req.user.role !== "DRIVER") {
        return res.redirect("/login");
    }
    else {
        const driver_details_data = await driver_details.findOne({ user: req.user._id });
        console.log(driver_details_data);
        res.render("driver_dashboard", { driver: req.user, driver_details: driver_details_data });
    }
});

router.get("/logout", (req, res) => {
    req.logout(function(err) {
        if (err) { return next(err); }
        res.redirect("/");
    }); 
});


module.exports = router;