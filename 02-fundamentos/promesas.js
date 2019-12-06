//Database of Employees and Salaries
let empleados = [{
    id: 1,
    nombre: 'Fernando'
}, {
    id: 2,
    nombre: 'Maria'
}, {
    id: 3,
    nombre: 'Pedro'
}];

let salarios = [{
    id: 1,
    salario: 1000
}, {
    id: 2,
    salario: 2000
}];

//FUNCTION to get employees using promise
let getEmpleado = (id) => {

    return new Promise((resolve, reject) => {

        let empleadoDB = empleados.find(empleado => empleado.id == id);

        if (!empleadoDB) {
            reject(`No se encontro en la base de datos el Empleado con el id ${id}`);
        } else {
            resolve(empleadoDB);
        }
    });

};

// Get employees using Promises
getEmpleado(10).then(empleado => {
    console.log('Empleado de la BD', empleado);
}, (err) => {
    console.log(err);
});


let getSalario = (empleado) => {

    return new Promise((resolve, reject) => {

        //find the salary for the User
        let salarioDB = salarios.find(salario => salario.id == empleado.id);


        if (!salarioDB) {
            reject(`No se encontro un salario para el usuario ${empleado.nombre}`);
        } else {

            resolve({
                'nombre': empleado.nombre,
                'salario': salarioDB.salario
            });

        }

    });

};

// Get employees using Promises
getEmpleado(3).then(empleado => {
    //console.log('Empleado de la BD', empleado);
    getSalario(empleado).then(resp => {
            console.log('Salario para el usuario', resp);
        },
        (err) => {
            console.log(err);
        })
}, (err) => {
    console.log(err);
});

//Change of promises
// Get employees using Promises
getEmpleado(1).then(empleado => {
        //console.log('Empleado de la BD', empleado);
        return getSalario(empleado);
    })
    .then(resp => { //Execute the promise for the second Promise on the chain
        console.log(`Salario de ${resp.nombre} es de ${resp.salario}`)
    })
    .catch(err => { //catch exept from any of the Promise on the chain. The First catch is going to show on Console
        console.log(err);
    });