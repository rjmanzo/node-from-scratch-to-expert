const opts = {
    base: {
        demand: true,
        alias: 'b'
    },
    limite: {
        alias: 'l',
        default: 10
    }
}

const argv = require('yargs')
    .command('listar', 'Imprime en cosola la tabla de multiplicar', opts)
    .command('crear', 'Genera en un archivo export la tabla de multiplicar', opts)
    .help()
    .argv;


module.exports = {
    argv: argv
}