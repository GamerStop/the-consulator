// Import Packages
const mongoose = require('mongoose')
const express = require('express')
const https = require("https")
const app = express();

// Middleware
app.use(express.json());

// DB Models
const Credentials = require('./models/credentials')

// MongoDB Connection
mongoose
    .connect(require('./config/keys').mongoURI,{ useNewUrlParser: true ,useUnifiedTopology: true, useFindAndModify: false})
    .catch(err => console.log(err));

// Authentication Test
app.post('/api/', (req, res) => {
    Credentials.countDocuments({ key : req.query.key }, (err, count) => {
        if (count === 1) {
            res.json({message:'authenticated'})
        } else {
            res.json({message:'bad credentials'})
        }
    })
}) 

// ----======= Animals Routes =======----

app.post('/api/animals/cat-facts/', (req, res) => {
    Credentials.countDocuments({ key : req.query.key }, (err, count) => {
        if (count === 1) {
            res.json({data : require('./api-data/animals/cat-facts.js').data[Math.floor(Math.random() * require('./api-data/animals/cat-facts.js').data.length)]})
        } else {
            res.json({message:'bad credentials'})
        }
    })
})

// ----======= Cryptocurrency Routes =======----

app.post('/api/cryptocurrency/btc/', (req, res) => {
    Credentials.countDocuments({ key : req.query.key }, (err, count) => {
        if (count === 1) {
            https.get('https://blockchain.info/tobtc?currency=' + req.query.currency + '&value=' + req.query.value, response => { 
                response.setEncoding("utf8")
                response.on("data", data => {
                    res.json({data : data})
                })
            })
        } else {
            res.json({message:'bad credentials'})
        }
    })
})

// Listen
app.listen(8080, console.log('MongoDB Connected, localhost:8080. - ' + new Date()))