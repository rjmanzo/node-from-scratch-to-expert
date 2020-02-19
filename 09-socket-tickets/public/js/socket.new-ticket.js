let socket = io();

var label = $('#lblNuevoTicket');

console.log('estoy por aca!');

//Recive info from server
socket.on('connect', function() {
    console.log('Conectado al servidor');
});

socket.on('disconnect', function() {
    console.log('Desconectado del servidor');
});

socket.on('estadoActual', function(resp) {
    label.text(resp.estado);
})

$('button').on('click', function() {
    socket.emit('siguienteTicket', null, function(siguienteTicket) {
        console.log(siguienteTicket);
        label.text(siguienteTicket);
    });
})