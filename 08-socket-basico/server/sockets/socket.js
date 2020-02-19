const { io } = require('../server');


io.on('connection', (client) => {
    //Message when an User connect to the Server
    console.log('Usuario Conectado');

    client.emit('enviarMensaje', {
        usuario: 'Administrador',
        mensaje: 'Bienvenido a esta aplicación!'
    });

    //When a User disconnect from the Server
    client.on('disconnect', () => {
        console.log('Usuario Desconectado');
    });

    //Get message from Client
    client.on('enviarMensaje', (data, callback) => {

        client.broadcast.emit('enviarMensaje', data);
        // if (message.usuario) {
        //     callback({
        //         resp: 'TODO SALIO BIEN!'
        //     });
        // } else {
        //     callback({
        //         resp: 'NO TODO SALIO MUY BIEN!!'
        //     });

        // }

    });

});