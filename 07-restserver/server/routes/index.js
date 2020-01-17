const express = require('express')

const app = express()

//Define routes
app.use(require('./users'));
app.use(require('./login'));
app.use(require('./category'));
app.use(require('./product'));

module.exports = app;