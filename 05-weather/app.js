// const axios = require('axios')
const argv = require('./config/yargs').argv;
const dotenv = require('dotenv')

//local requirement
const place = require('./place/place');
const weather = require('./weather/weather');

//load credentials
require('dotenv').config();

//asign credentials
bingAPI = process.env.BING_API_KEY;
openweatherAPI = process.env.OPEN_WEATHER_KEY;

const getInfo = async(direccion) => {
    try {


        //Find the geoposition values for Location
        const lugar = await place.getlugar(direccion);
        const clima = await weather.getclima(lugar.latitud, lugar.longuitud);

        //always the response from the getClima should be safe. We are using the accurate way
        //of asking for the climate from a location. Using the Lat and lng
        //const clima = await weather.getclima(lugar.latitud, lugar.longuitud);

        //print Results
        console.log("Locación: ", lugar.direccion);
        console.log("Longitud: ", lugar.latitud);
        console.log("Latitud: ", lugar.longuitud);
        console.log("Temperatura: ", clima.Temperatura);

    } catch (error) {
        console.error(error);
    }
}

//call the function
getInfo(argv.direccion);