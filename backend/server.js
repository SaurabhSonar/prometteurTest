const express = require('express')
const cors=require('cors')
const port = 8080;
const app = express()
const db = require('./config/db')
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors())
//
db.connectDB()
//
const userRoutes=require('./Routes/userRoutes')
app.use('/api/',userRoutes)

app.listen(port, (err) => {
    if (err) throw err;
    else {
        console.log("Server runs on " + port)
    }
})
