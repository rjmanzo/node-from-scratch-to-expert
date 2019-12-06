let deadpool = {
    nombre: 'Wade',
    apellido: 'Winston',
    poder: 'Regeneración',
    getNombre: function() {
        return `${this.nombre} ${this.apellido} - Poder: ${this.poder}`;
    }
}

//forma estandar de llamar funciones
let nombre = deadpool.nombre;
let apellido = deadpool.apellido;
let poder = deadpool.poder;

// call de la function en el constructor
console.log(deadpool.getNombre());

//forma destructurada
let { nombre: primerNombre, apellido: apellidoPrincipal, poder: personaPoder } = deadpool;

console.log(primerNombre, apellidoPrincipal, personaPoder);