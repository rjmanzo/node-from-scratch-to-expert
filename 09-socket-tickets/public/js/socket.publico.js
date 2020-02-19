let socket = io();

var lblTicket1 = $('#lblTicket1');
var lblTicket2 = $('#lblTicket2');
var lblTicket3 = $('#lblTicket3');
var lblTicket4 = $('#lblTicket4');

var lblEscritorio1 = $('#lblEscritorio1');
var lblEscritorio2 = $('#lblEscritorio2');
var lblEscritorio3 = $('#lblEscritorio3');
var lblEscritorio4 = $('#lblEscritorio4');

var lblTickets = [lblTicket1, lblTicket2, lblTicket3, lblTicket4];
var lblEscritorios = [lblEscritorio1, lblEscritorio2, lblEscritorio3, lblEscritorio4];

socket.emit('listadoTickets', function(resp) {
    actualizarHTML(resp);

});

socket.on('last4', function(resp) {
    var newtickets = new Audio('audio/new-ticket.mp3');
    newtickets.play();

    actualizarHTML(resp.last4);

});

function actualizarHTML(data) {

    for (var i = 0; i <= lblEscritorios.length - 1; i++) {

        lblTickets[i].text('Ticket ' + data[i].ticket);
        lblEscritorios[i].text('Escritorio ' + data[i].desk);

    }

}