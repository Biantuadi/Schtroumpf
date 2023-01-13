const express = require('express');
const app = express();
const cors = require("cors");

// middleware
app.use(cors());
app.use(express.json());7

// DB
require('./db/mongoDB'); 

// routes
const schtroumpfRoutes = require('./routes/schtroumpf.router');
app.use('/api/', schtroumpfRoutes);


module.exports = app;