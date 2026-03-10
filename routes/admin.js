const express = require("express");
const router = express.Router();
const User = require("../models/user");
const DriverDetails = require("../models/driver_details");
const Event = require("../models/event");
const Task = require("../models/Task");

// Route to render the add driver form

router.get("/adddriver", (req, res) => {
    res.render("add_driver");
});



//router for displaying the dashboard

router.get("/admindashboard",async (req, res) => {
    console.log("hello");

    if (!req.isAuthenticated() || req.user.role !== "ADMIN") {
        return res.redirect("/login");
    } else {
        const event= await Event.find();
        const driverCount = await DriverDetails.countDocuments();
        res.render("admin_dashboard", { username: req.user.username, driverCount, event });
    }
});
 


// Route to handle adding a new driver
router.post("/adddriver", async (req, res) => {
    try {
        const {
            username,
            email,
            password
        } = req.body;

        const newUser = new User({
            username,  // make username = email
            email,
            role: "DRIVER"

        });

        const registeredUser = await User.register(newUser, password);

        await DriverDetails.create({
            user: registeredUser._id,
            phone: req.body.phone,
            licenseNumber: req.body.licenseNumber,
            vehicleType: req.body.vehicleType,
            vehicleNumber: req.body.vehicleNumber
        });


        res.status(201).json({
            message: "User registered successfully",
            user: registeredUser
        });

    } catch (err) {
        res.status(400).json({
            error: err.message
        });
    }
});


// route to list out drivers for admin to manage
router.get("/listdrivers", async (req, res) => {
    if (!req.isAuthenticated() || req.user.role !== "ADMIN") {
        return res.redirect("/login");
    }
    const drivers = await DriverDetails.find().populate("user");
     
     
    res.render("list_drivers", { drivers });
});


//route to create and post event
router.get("/createevent", (req, res) => {
    if (!req.isAuthenticated() || req.user.role !== "ADMIN") {
        return res.redirect("/login");
    }
    res.render("create_event");
});

router.post("/events", async (req, res) => {
    if (!req.isAuthenticated() || req.user.role !== "ADMIN") {
        return res.redirect("/login");
    }
    
    try {
    const { eventName,startDate,endDate,status,hotel,venue,airport } = req.body;
    const newEvent = new Event({ 
        eventName,
         start_date:startDate,
         end_date:endDate,
         status,
         hotel_location:hotel,
         venue_location:venue,
        Airport_location:airport
    });
    await newEvent.save();
    console.log("Event created successfully");
    res.redirect("/admin/createevent");
    } catch (err) {
        res.status(400).json({
            error: err.message
        });
    }
});



//route to display assign events
router.get("/assigneventdetails", async (req, res) => {
    if (!req.isAuthenticated() || req.user.role !== "ADMIN") {
        return res.redirect("/login");
    }
    else{
        const drivers = await DriverDetails.find().populate("user");
        const driverCount = await DriverDetails.countDocuments();
        res.render("assign_event_details", { username: req.user.username, driverCount, drivers });
    }
});


//route to assign event to driver
router.get("/assignevent/:id", async (req, res) => {
    if (!req.isAuthenticated() || req.user.role !== "ADMIN") {
        return res.redirect("/login");
    }
    const driver = await DriverDetails.findById(req.params.id).populate("user");
    res.render("create_event", { driver });
}); 

router.get("/logout", (req, res) => {
    req.logout(function(err) {
        if (err) { return next(err); }
        res.redirect("/");
    }); 
});

router.get("/remove-driver/:id", async (req, res) => {
    console.log("Removing driver with ID:", req.params.id); 
    if (!req.isAuthenticated() || req.user.role !== "ADMIN") {
        return res.redirect("/login");
    }
    try {
        console.log("Attempting to remove driver with ID:", req.params.id);
         await DriverDetails.findOneAndDelete({ user: req.params.id });
        await User.findByIdAndDelete(req.params.id);
       
        res.redirect("/admin/listdrivers");
    } catch (err) {
        res.status(400).json({
            error: err.message
        });
    }
});




router.post("/assign-driver", async (req,res)=>{

const {driverId,eventId} = req.body;

await Task.create({
driver:driverId,
event:eventId
});

res.redirect("/admin/dashboard");

});










module.exports = router;