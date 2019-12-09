/*
 * Async Await
 */

//original way of generation of Promise

// let getName = () => {
//     return new Promise((resolve, reject) => {
//         resolve ('Fernando');
//     }) 
// }

// Return name
// console.log(getName());

// 
let getName = async() => {
    setTimeout(() => {
        return 'Fernando';

    }, 3000)
}
let saludo = async() => {

    let nombre = await getName();

    return `Hola ${nombre}`;

}

saludo().then(saludo => {
        console.log(saludo);
    })
    .catch(e => {
        console.log('Error de Async', e)
    })