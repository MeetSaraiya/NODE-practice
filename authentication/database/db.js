const mongoose = require('mongoose');

module.exports = connectToDB = async () =>{
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("mongodb atlas is working");
    } catch (error) {
        console.log("mongodb connection failed");
        // console.log(error);
        process.exit(1);
    }
}
