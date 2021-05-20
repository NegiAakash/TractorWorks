const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
const adminAPI = require('./admin');
const brandAPI = require('./brand');
const tractorAPI = require('./tractor');
const dbconnection = require('./dbconnection');
// pe = require('pretty-error').start();

const port = process.env.port || 5000;

// establishing connection to database
dbconnection();

app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.status(200).send('Homepage');
})

// All endpoint requests pass through these and check for connection first
// sends HTTP code - 500 if unable to connect to db
app.get(/.*/, (req, res, next) => {
    if(mongoose.connection.readyState !== 1)
    return res.sendStatus(500);
    next();
})

app.post(/.*/, (req, res, next) => {
    if(mongoose.connection.readyState !== 1)
    return res.sendStatus(500);
    next();
})

app.put(/.*/, (req, res, next) => {
    if(mongoose.connection.readyState !== 1)
    return res.sendStatus(500);
    next();
})

app.delete(/.*/, (req, res, next) => {
    if(mongoose.connection.readyState !== 1)
    return res.sendStatus(500);
    next();
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})

// using APIs for expoints related to various modules

app.use('/admin', adminAPI);
app.use('/brand', brandAPI);
app.use('/tractor', tractorAPI);