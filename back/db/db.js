const mongoose = require("mongoose");
module.exports = ()=>{
    try {
        // console.log(process.env.DB)
        mongoose.connect(process.env.URL);
        console.log("Connected to database successfully");
    } catch (error) {
        console.log(error);
        console.log("Could not connect to the database")
    }
}