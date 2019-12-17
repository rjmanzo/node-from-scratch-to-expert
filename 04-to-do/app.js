const argv = require('./config/yargs').argv;
const todos = require('./to-do/to-do');
const colors = require('colors');

let comando = argv._[0];

switch (comando) {

    case 'crear':
        let crear = todos.crear(argv.descripcion);
        console.log(crear);
        break;
    case 'listar':
        let listar = todos.listar();
        if (listar.length > 0) {
            for (tarea of listar) {
                console.log('================Por hacer =================='.green);
                console.log(tarea.descripcion);
                console.log("Estado", tarea.completado);
                console.log('============================================'.green);
            }
        } else {
            return 'Sin tareas pendientes!';
        }
        break;
    case 'actualizar':
        let actualizar = todos.actualizar(argv.descripcion, argv.completado);
        console.log(actualizar);
        break;
    case 'borrar':
        let borrar = todos.borrar(argv.descripcion);
        console.log(borrar);
        break;
    default:
        console.log("Comando no reconocido. Ingrese un comando por favor");
}