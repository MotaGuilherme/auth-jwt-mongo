const express = require('express');
const userRoutes = require('./routes')
const routes = express.Router(); 

routes.use('/auth', userRoutes)

module.exports = routes;