const config = require('config');
const express = require('express');
const app = express();
const winston = require('winston');

require('express-async-errors');
require('./startup/logging')();
// require('./startup/config')();
require('./startup/routes')(app);
var server = require('http').createServer(app);
const port = process.env.PORT || 3000;
// server = app.listen(port, () => {winston.info(`on port ${port}`)});;
module.exports = app;