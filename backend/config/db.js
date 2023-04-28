const mongoose = require('mongoose')
//dbconnection 
const db = "mongodb://localhost:27017/prometteur";

 const connectDB = async () => {
    try {
        await mongoose.set('strictQuery', false);
        await mongoose.connect(db, { useNewUrlParser: true });
        console.log("MongoDB connected")
    }
    catch (err) {
        console.log(err.message);
    }
}
module.exports={
    connectDB
}
//end