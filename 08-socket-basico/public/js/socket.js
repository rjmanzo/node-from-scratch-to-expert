    var socket = io();

    //Recive info from server
    socket.on('connect', function() {
        console.log('Conectado al servidor');
    });

    socket.on('disconnect', function() {
        console.log('Desconectado del Servidor');
    })

    //Emit info to the Server
    socket.emit('enviarMensaje', {
        Usuario: 'Fernando',
        mensaje: 'Hola Mundo'
    }, function(resp) {
        console.log(resp);
    });

    //Listen Custom Message from Server
    socket.on('enviarMensaje', function(message) {
        console.log('El servidor esta emitiendo el siguiente mensaje:', message);
    })