require('dotenv').config();
const express = require('express')
const app = express()
const port = 3000

const mongoose = require("mongoose")
mongoose.connect('mongodb://0.0.0.0:27017/raceTimer');

app.use(express.urlencoded());
app.use(express.json());

const userRoute = require('./routes/userRoute');
app.use('/users', userRoute);

const timerRoute = require('./routes/timerRoute');
app.use('/timers', timerRoute);

app.listen(port);


