//Requires

const argv = require('./config/yargs').argv;
// In order to avoid the double call of argv
// argv.argv
const colors = require('colors');
const mult = require('./multiplicar/mulplicar');


// console.log(process.argv);
// find the parameters
// let argv2 = process.argv;
// //asign the parameter pass throw the console
// let parametro = argv[2];

let comando = argv._[0];

// let base = argv.base;
// let limite = argv.limite;

switch (comando) {

    case 'crear':
        mult.crearArchivo(argv.base, argv.limite)
            .then(archivo => {
                console.log(archivo);
            }).catch((err) => {
                console.log(err);
            });
        break;
    case 'listar':
        mult.listarTabla(argv.base, argv.limite)
            .then(resp => {
                console.log(resp);
            }).catch((e) => {
                console.log(e);
            });
        break;
    default:
        console.log("Comando no reconocido. Ingrese un comando por favor");
}