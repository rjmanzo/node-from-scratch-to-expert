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


//FUNCTION to get employees
let getEmpleado = (id, callback) => {

    let empleadoDB = empleados.find(empleado => empleado.id == id);

    if (!empleadoDB) {
        callback(`No se encontro en la base de datos el Empleado con el id ${id}`);
    } else {
        callback(null, empleadoDB);
        //Llamar más de una vez al callack. No controla que la respuesta que ya fue ejecutada
        //callback(null, empleadoDB);
    }
}

//get empleado
getEmpleado(1, (err, empleado) => {

    if (err) {
        return console.log(err);
    }

    //return result on console
    console.log(empleado);

});

//find the employee and then return the salary. Otherwise return an error message
let getSalario = (empleado, callback) => {

    //find the salary for the User
    let salarioDB = salarios.find(salario => salario.id == empleado.id);


    if (!salarioDB) {
        callback(`No se encontro un salario para el usuario ${empleado.nombre}`);
    } else {

        callback(null, {
            'nombre': empleado.nombre,
            'salario': salarioDB.salario
        });

    }
};

//get empleado + Salario
getEmpleado(2, (err, empleado) => {

    if (err) {
        return console.log(err);
    }

    //return result on console
    getSalario(empleado, (err, resp) => {

        if (err) {
            return console.log(err);
        }
        console.log(resp);
    });
});