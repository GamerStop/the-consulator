// Import Packages
const mongoose = require('mongoose')
const express = require('express')
const app = express();

// Middleware
app.use(express.json());

// DB Models
const Credentials = require('./models/credentials')

// MongoDB Connection
mongoose
    .connect(require('./config/keys').mongoURI,{ useNewUrlParser: true ,useUnifiedTopology: true, useFindAndModify: false})
    .then(() => console.log('MongoDB Connected, localhost:8080. - ' + new Date()))
    .catch(err => console.log(err));

// Basic Route
app.post('/', (req, res) => {
    // Authentication
    Credentials.countDocuments({ key : req.query.key }, (err, count) => {if (count === 1) {res.status(200).send("authenticated")} else {res.status(200).send("bad credentials")}}) 
})

// Listen
app.listen(8080)