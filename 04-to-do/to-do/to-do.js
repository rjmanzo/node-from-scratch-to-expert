const fs = require('fs');


let listadoPorHacer = [];

const filepath = './db/data.json';

//save tarea to the DB
const guardarDB = () => {

    let data = JSON.stringify(listadoPorHacer);

    fs.writeFile('./db/data.json', data, (err) => {
        if (err) throw new Error('Error writing file:', err)
        return
    })

}

//save tarea to the DB
const cargarDB = () => {

    try {
        listadoPorHacer = require('../db/data.json');

    } catch (error) {

        listadoPorHacer = [];
    }
}

const crear = (descripcion) => {

    let porHacer = {
        descripcion,
        completado: false
    }

    //load actual db
    cargarDB();

    // //save local
    listadoPorHacer.push(porHacer);

    //console.log(listadoPorHacer);

    // //save on DB
    guardarDB();

    return porHacer;
};

const listar = () => {

    //cargar datos 
    cargarDB();

    return listadoPorHacer;

}

const actualizar = (descripcion, completado = true) => {

    // load database
    cargarDB();

    //find the index with the value of descripcion
    let index = listadoPorHacer.findIndex(tarea => {
        return tarea.descripcion === descripcion;
    })

    //if the value was found them update the completado value
    if (index >= 0) {
        listadoPorHacer[index].completado = completado;
        // //save on DB
        guardarDB();
        return true;
    } else {
        return false;
    }

}

const borrar = (descripcion) => {

    //load database
    cargarDB();

    //Filter from the array the 

    let nuevoListado = listadoPorHacer.filter(tarea => {
        return tarea.descripcion !== descripcion;
    });

    //if both list dont have the same lenght the record must to be deleted
    if (nuevoListado !== listadoPorHacer) {

        listadoPorHacer = nuevoListado;
        guardarDB();
        return true;

    } else {
        return false;
    }

}

module.exports = {
    crear: crear,
    listar: listar,
    actualizar: actualizar,
    borrar: borrar
}