const mongoose = require("mongoose");
const User = require("./models/user");

async function createUser() {
    await mongoose.connect("mongodb://127.0.0.1:27017/test");

    const user = new User({ username: "admin01", email:" admin@gmail.com", role:"ADMIN" });

    await User.register(user, "admin123");

    console.log("User created successfully");
    process.exit();
}

createUser().catch(err => console.log(err));

 