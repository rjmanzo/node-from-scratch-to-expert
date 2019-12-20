const axios = require('axios')

//load credentials
openweatherAPI = global.openweatherAPI;

const getclima = async(latitud, longitud) => {


    //let forecastRequest = `https://api.openweathermap.org/data/2.5/weather?lat=${latitud}&lon=${longitud}&units=metric&appid=adafc4373ed0cbce96c1860f5480897a`;
    let forecastRequest = `https://api.openweathermap.org/data/2.5/weather?lat=${latitud}&lon=${longitud}&units=metric&appid=${openweatherAPI}`;

    //console.log(forecastRequest);

    responseWeather = await axios.get(forecastRequest);

    const { data } = responseWeather;

    //onsole.log(data);

    if (!!data) {

        let actualTemp = data.main.temp;

        return { Temperatura: actualTemp }


    } else {
        throw new Error(`No se encuentra la temperatura para las coordenadas lat=${latitud},${longitud}`);
    }

}
module.exports = {
    getclima: getclima
}