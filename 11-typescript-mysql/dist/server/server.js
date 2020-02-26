"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const path = require("path");
class Server {
    constructor(port) {
        this.port = port;
        this.app = express();
    }
    static init(port) {
        return new Server(port);
    }
    pubicFolder() {
        const publicPath = path.resolve(__dirname, '../public');
        this.app.use(express.static(publicPath));
        //console.log(publicPath);
    }
    start(callback) {
        this.app.listen(this.port, callback);
        this.pubicFolder();
    }
}
exports.default = Server;
