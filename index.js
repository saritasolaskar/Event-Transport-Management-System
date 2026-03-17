const express = require("express");
const app = express();
 
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


//routes setup
const router = express.Router();


//ejs setup
app.set("view engine", "ejs");
const path = require("path");
app.set("views", path.join(__dirname, "views"));



 
//MONGOOSE SETUPP

const mongoose = require("mongoose");
main().catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb+srv://saritasolaskar:Sarita%402005@cluster0.4pe3ccg.mongodb.net/?appName=Cluster0');

    // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}



//common paths
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`server is running on port ${port}`);
});
app.get("/", (req, res) => {
    res.render("Landing_Page");
});










//passport setup configuration




 
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");




//session & flash setup
const sessionOptions = {
    secret: "mysupersecretkey",   // move to .env later
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
        maxAge: 7 * 24 * 60 * 60 * 1000
    }
};
app.use(session(sessionOptions)); // Session first
app.use(passport.initialize());   // Then Passport
app.use(passport.session());      // Then Passport Session
app.use(flash());
// requires the model with Passport-Local Mongoose plugged in
const user = require('./models/user');

// use static authenticate method of model in LocalStrategy
passport.use(new LocalStrategy(user.authenticate()));

// use static serialize and deserialize of model for passport session support
passport.serializeUser(user.serializeUser());
passport.deserializeUser(user.deserializeUser());



 
//accessing routes

const adminRoutes = require("./routes/admin");
const driverRoutes = require("./routes/driver");
const authRoutes = require("./routes/auth");
const { error } = require("console");

app.use("/admin", adminRoutes);
app.use("/driver", driverRoutes);
app.use("/auth", authRoutes);




app.get("/login", (req, res) => {
    res.render("Login_Page", { error: req.flash("error") });
});


 
