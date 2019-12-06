let nombre = 'deedpool';
let real = 'Wade sarasa';

// nombreCompleto1 = `${nombre} ${real}`;
// nombreCompleto2 = nombre + ' ' + real;

//DEVUELDE TRUE
// console.log(nombreCompleto1 === nombreCompleto2);


function getNombre() {
    return `${ nombre } ${ real }`;
}

console.log(`el nombre completo es: ${ getNombre() }`);