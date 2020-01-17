//PORT
process.env.PORT = process.env.PORT || 3000;

//ENVIROMENT
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

/* TOKEN VARIABLES
 60 seconds, 60 min, 24 horas, x dias

One month for token expiration
 */
process.env.EXPIRATION_TIME = 60 * 60 * 24 * 30;
process.env.SEED = process.env.TOKEN_SEED || 'secret-desarrollo';

//DATABASE
let urlDB;

if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/cafe';

} else {
    urlDB = process.env.DB_URI;
}

//export URL via env
process.env.URLDB = urlDB;

//Asign the Google variables
process.env.CLIENT_ID = process.env.CLIENT_ID || `${process.env.GOOGLE_CLIENT_ID}.apps.googleusercontent.com`;