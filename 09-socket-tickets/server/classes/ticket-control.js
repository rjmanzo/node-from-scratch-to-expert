const fs = require('fs');

class Ticket {
    constructor(numeroTicket, numeroDesk) {
        this.ticket = numeroTicket;
        this.desk = numeroDesk;
    }
}

class TicketControl {

    constructor() {
        this.last = 0;
        this.today = new Date().getDate();
        this.tickets = [];
        this.last4 = [];

        let data = require('../data/data.json');

        if (data.today === this.today) {

            this.last = data.last;
            this.tickets = data.tickets;
            this.last4 = data.last4;

        } else {
            this.reiniciarConteo();
        }
    }

    siguiente() {
        this.last += 1;
        let ticket = new Ticket(this.last, null);
        this.tickets.push(ticket);
        this.grabarArchivo();

        return `proximo Ticket: ${this.last}`;

    }

    getEstadoActual() {
        return `Ticket: ${this.last}`;
    }

    asignarTicket(numeroDesk) {

        if (this.tickets.length === 0) {
            return 'No hay registro de nuevos tickets';
        }

        // get ticket from the Quote
        let numeroTicket = this.tickets[0].ticket;
        //delete the first element from the array
        this.tickets.shift();

        //create new Ticket 
        let atenderTicket = new Ticket(numeroTicket, numeroDesk);
        //Assign new ticket to the Assigned List
        this.last4.unshift(atenderTicket);

        //Delete old Tickets reference
        if (this.last4.length > 4) {
            //delete the Last element of the List (Older)
            this.last4.splice(-1, 1);
        }

        //save records
        this.grabarArchivo();

        console.log(this.last4);

        return atenderTicket;
        //return `Siguiente ticket asignado: ${ticket.ticket}`;
    }

    getLast4() {
        //return the last 4 ticket on the Quote
        return this.last4;
    }

    reiniciarConteo() {

        this.last = 0;
        this.tickets = [];
        this.last4 = [];
        this.grabarArchivo();

        console.log('Reinicializando el sistema');

    }

    grabarArchivo() {

        let dataJSON = {
            last: this.last,
            today: this.today,
            tickets: this.tickets,
            last4: this.last4
        };

        let jsonDataString = JSON.stringify(dataJSON);

        fs.writeFileSync('./server/data/data.json', jsonDataString);


    }

}
module.exports = {
    TicketControl
}