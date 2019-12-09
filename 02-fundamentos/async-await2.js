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
let getEmpleado = async(id) => {

    let empleadoDB = empleados.find(empleado => empleado.id == id);

    if (!empleadoDB) {
        throw new Error(`No se encontro en la base de datos el Empleado con el id ${id}`);
    } else {
        return empleadoDB;
    }

};


let getSalario = async(empleado) => {

    //find the salary for the User
    let salarioDB = salarios.find(salario => salario.id == empleado.id);

    if (!salarioDB) {
        throw new Error(`No se encontro un salario para el usuario ${empleado.nombre}`);
    } else {

        return {
            'nombre': empleado.nombre,
            'salario': salarioDB.salario
        }

    }

};

let getInformacion = async(id) => {

    let empleado = await getEmpleado(id);
    let salario = await getSalario(empleado);

    return `${salario.nombre} tiene un salario de ${salario.salario}$`;

};

getInformacion(1)
    .then(mensaje => console.log(mensaje))
    .catch(e => console.log(e))