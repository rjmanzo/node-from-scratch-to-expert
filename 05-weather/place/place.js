const axios = require('axios')

// //load credentials
// require('dotenv').config()

// //load credentials
//global.openweatherAPI = process.env.OPEN_WEATHER_KEY;
bingAPI = global.bingAPI;

const getlugar = async(direccion) => {

    let encodeLocation = encodeURI(direccion);

    //let request = `http://dev.virtualearth.net/REST/v1/Locations?query=${encodeLocation}?maxResults=1?o=json&key=AiJKvMw4Amfu-gSafpSbx0IMp72S53IEkTlm-61Lw1ICrwl5JgS7x-qD15xDQvOQ`;
    let request = `http://dev.virtualearth.net/REST/v1/Locations?query=${encodeLocation}?maxResults=1?o=json&key=${bingAPI}`;

    //call async callback
    let resp = await axios.get(request);

    const { data } = resp;

    //console.log(data.resourceSets);

    // Response descontructed. If the result is null should return 
    //data.resourceSets[0].estimatedTotal > 0
    if (data.resourceSets[0].estimatedTotal > 0) {

        let data_json = data.resourceSets[0].resources;

        //console.log(data_json[0]);

        //Get formatted address
        let formattedAddress = data_json[0].address.formattedAddress;

        //console.log(formattedAddress);
        // //Get lat and lon location address location from the Request
        let lat = data_json[0].point.coordinates[0];
        let lon = data_json[0].point.coordinates[1];

        // console.log("Address: ", formattedAddress);
        // console.log("Latitude: ", lat);
        // console.log("Longitude: ", lon);

        //return parsed response
        return {
            direccion: formattedAddress,
            latitud: lat,
            longuitud: lon
        }

    } else {
        throw new Error(`No hay resultados para la cuidad ${direccion}`);
    }
};

module.exports = {
    getlugar: getlugar
}