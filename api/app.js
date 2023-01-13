const express = require('express');
const app = express();
const cors = require("cors");

// middleware
app.use(cors());
app.use(express.json());

// routes
const schtroumpfRoutes = require('./routes/schtroumpf.router');
app.use('/api/schtroumpf', schtroumpfRoutes);


module.exports = app;