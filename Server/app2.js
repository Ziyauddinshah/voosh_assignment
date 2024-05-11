const express = require('express');
const app2 = express();
const routes = require('./routes2');

app2.use('/',routes);

module.exports = app2;