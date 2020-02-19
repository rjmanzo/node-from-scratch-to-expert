var socket = io();

//var label = $('newTicket');
var searchParams = new URLSearchParams(window.location.search);

//check if we have a desktop asinged as default Param
if (!searchParams.has('escritorio')) {
    window.location = 'index.html';
    throw new Error('El Escritorio es necesario');
}

var escritorio = searchParams.get('escritorio');
console.log(escritorio);

//Asign escritorio and Ticket

$('h1').text('Escritorio ' + escritorio);
var label = $('small');

$('button').on('click', function() {

    var data = {
        escritorio: escritorio
    }

    socket.emit('asignarTicket', data, function(resp) {
        if (resp === 'No hay registro de nuevos tickets') {
            alert(resp);
            return;
        }

        console.log('Valor del Ticket actual:' + resp.ticket);

        label.text('Ticket ' + resp.ticket);


    });

})