import Server from './server/server';
import Router from './router/router';
import MYSQL from './mysql/mysql';

const server = Server.init(3000);
server.app.use(Router);

//const mysql = new MYSQL();
MYSQL.instance;

server.start(() => {

    console.log('Corriendo Server en el Puerto 3000');
})