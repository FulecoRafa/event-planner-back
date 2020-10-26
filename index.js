// Imports
const express = require('express');
const mongoose = require('mongoose');
const requireDir = require('require-dir');

// Config dotenv
require('dotenv').config();

// Connecting to DB
mongoose.connect('mongodb://localhost:27017', { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true})
.then(()=>{console.log("Successfully connect to MongoDB!")})
.catch(()=>{console.log("Error trying to connect to MongoDB")});

// Requiring models
requireDir('./src/models');

// Setting app up
const app = express();
app.use(express.json());

app.use(require('cors')());

// Routing
app.use('/user', require('./src/routes/user'));
app.use('/event', require('./src/routes/event'));
app.use('/invite', require('./src/routes/invite'));

// Serving
app.listen(9000, () => {
  console.log("Server running @ http://localhost:9000");
})