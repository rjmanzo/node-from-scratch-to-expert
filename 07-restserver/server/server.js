//Load enviroment variables
require('dotenv').config()
    //load config variables
require('./config/config')

const path = require('path');

// load libraries
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express()

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// --- REST SERVICES --
app.use(require('./routes/index'));

//Public resoruces
app.use(express.static(path.resolve(__dirname, '../public')));

//Connect to the database
mongoose.connect(process.env.URLDB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
});

app.listen(process.env.PORT, () => { console.log(`Escuchando en el puerto ${process.env.PORT}`); });