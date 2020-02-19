const express = require('express');
const socketIO = require('socket.io');
const http = require('http');
const path = require('path');

const app = express();
//Server config variables from express
const server = http.createServer(app);

const publicPath = path.resolve(__dirname, '../public');
const port = process.env.PORT || 3000;

//Add static path to Express
app.use(express.static(publicPath));

//Init IO backend service
module.exports.io = socketIO(server);
//import logic for socket service
require('./sockets/socket');

//app.listen(port, (err) => {
server.listen(port, (err) => {

    if (err) throw new Error(err);

    console.log(`Servidor corriendo en puerto ${ port }`);

});