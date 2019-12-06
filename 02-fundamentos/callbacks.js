// setTimeout(() => {
//     console.log('Hola Mundo');
// }, 3000)

let getUsuarioById = (id, callback) => {

    let usuario = {
        nombre: 'Fernando',
        id: id
    }

    if (id == 20) {

        console.log(`El usuario con id (${id}) no existe en la BD`);

    } else {

        callback(null, usuario)
    }


}

getUsuarioById(10, (err, usuario) => {

    if (err) {
        return console.log(err);
    }

    console.log(`Usuario de base de datos`, usuario);
})