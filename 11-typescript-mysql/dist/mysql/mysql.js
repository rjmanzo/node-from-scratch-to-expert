"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mysql_1 = __importDefault(require("mysql"));
class MYSQL {
    constructor() {
        this.conectado = false;
        console.log('Clase inicializada');
        this.cnn = mysql_1.default.createConnection({
            host: 'localhost',
            user: 'root',
            password: 'admin',
            database: 'node_dev'
        });
        this.conectarDB();
    }
    static get instance() {
        return this._instance || (this._instance = new this());
    }
    static ejecuteQuery(query, callback) {
        //console.log('llego hasta aqui!');
        this._instance.cnn.query(query, (err, results, fields) => {
            console.log('llego hasta aqui!');
            if (err) {
                console.log('Error en query');
                console.log(err);
                return callback(err);
            }
            if (results.length === 0) {
                console.log('No hay registros para la Query solicitada');
                return;
            }
            else {
                callback(null, results);
            }
        });
    }
    conectarDB() {
        this.cnn.connect((error) => {
            if (error) {
                console.log(error.message);
                return;
            }
            console.log('connected as id ' + this.cnn.threadId);
        });
    }
}
exports.default = MYSQL;
