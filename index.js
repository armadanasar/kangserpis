const config = require('config');
const express = require('express');
const app = express();
const winston = require('winston');

require('express-async-errors');
require('./startup/logging')();
require('./startup/config')();
require('./startup/db')();
require('./startup/validation')();
require('./startup/routes')(app);

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {winston.info(`on port ${port}`)});

module.exports = server;


console.log(config.get('database.databaseName'), config.get('database.username'), config.get('database.password'), {
    dialect: config.get('database.dialect'),
    host: config.get('database.host')
  })