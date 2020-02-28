const axios = require('axios');

const API_KEY = '1cd9b65e4fa1cbc737b84b34fdee088d';


// .then(function (res) <-- this is where the actual data lands but we pass it to our express back end here: callback(res); to actually do something with the data
// callback function is the link between the express backend and the actual result that is being returned from api request
// catch will log and return any errors regarding the connection to OpenWeatherApp API

class Weather {
    static retrieveByCity (city, callback) {
        axios({
            url: `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${API_KEY}&units=metric`
        }).then(function (res) {
            callback(res.data);
        }).catch(function (err) {
            console.log(err);
            callback({ error: 'Could not reach OpenWeatherMap API.'});
        });
    }
}

module.exports = Weather;