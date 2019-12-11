const fs = require('fs');
const colors = require('colors');

let data = '';

let crearArchivo = (base, limite) => {

    return new Promise((resolve, reject) => {

        if (!Number(base)) {
            reject(`La base ${base} no es un numero!`);
            return;
        } else if (limite <= 0) {
            reject(`El limite tiene que ser mayor o igual a 1. El valor ${limite} no es valido`);
            return;
        }

        //calculate multiple table
        for (let i = 1; i <= limite; i++) {
            data += `${base} * ${i} = ${base * i}` + '\n';
        }

        // console.log(data);

        const filename = `tabla-${base}.txt`;

        // Create file
        fs.writeFile(`tablas/${filename}`, data, (err) => {
            if (err)
                reject(err)
            else
                resolve(`${filename}`)
        });
    });

};

let listarTabla = (base, limite) => {

    return new Promise((resolve, reject) => {

        if (!Number(base)) {
            reject(`La base ${base} no es un numero!`);
            return;
        } else if (limite <= 0) {
            reject(`El limite tiene que ser mayor o igual a 1. El valor ${limite} no es valido`);
            return;
        }

        //calculate multiple table
        for (let i = 1; i <= limite; i++) {
            data += `${base} * ${i} = ${base * i}` + '\n';
        }

        //return as response the data to print on the Console 
        resolve(data);

    })

};

module.exports = {
    crearArchivo: crearArchivo,
    listarTabla: listarTabla
}