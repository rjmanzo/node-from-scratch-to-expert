//requires
const argv = require('yargs')
    .options({
        direccion: {
            alias: 'd',
            desc: 'Dirección de la ciudad',
            demand: true
        }
    })
    .help()
    .argv;

module.exports = {
    argv: argv
}