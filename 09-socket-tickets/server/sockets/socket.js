const { io } = require('../server');
const { TicketControl } = require('../classes/ticket-control');

let ticketControl = new TicketControl();


io.on('connection', (client) => {

    console.log('Usuario conectado');

    // Escuchar el cliente
    client.on('siguienteTicket', (data, callback) => {

        let resp = ticketControl.siguiente();
        console.log(resp);
        callback(resp);
    });

    // Asignar Ticket a Escritorio
    client.on('asignarTicket', (data, callback) => {

        if (!data.escritorio) {
            return callback({
                err: true,
                mensaje: 'El Escritorio es necesario (server)'
            });
        }

        let resp = ticketControl.asignarTicket(data.escritorio);

        //check if the ticket is assigned to a new Desktop or not

        if (resp != 'No hay registro de nuevos tickets') {
            client.broadcast.emit('last4', {
                last4: ticketControl.last4
            });
        }

        callback(resp);
    });

    //Actualizar la pantalla Publica de tickets
    client.on('listadoTickets', (callback) => {
        let resp = ticketControl.last4;
        console.log(resp);
        if (resp.length === 0) {
            return 'No hay tickets por atender';
        }
        callback(resp);
    });

    client.emit('estadoActual', {
        estado: ticketControl.getEstadoActual()
    });



    client.on('disconnect', () => {
        console.log('Usuario desconectado');
    });


});