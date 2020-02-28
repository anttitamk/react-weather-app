const axios = require('axios');

require('dotenv').config();

// .then(function (res) <-- this is where the actual data lands but we pass it to our express back end here: callback(res); to actually do something with the data
// callback function is the link between the express backend and the actual result that is being returned from api request
// catch will log and return any errors regarding the connection to OpenWeatherApp API

class Weather {
    static retrieveByCity (city, callback) {
        axios({
            url: `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${process.env.WEATHER_API_KEY}&units=metric`
        }).then((res) => {
            callback(res.data);
        }).catch((err) => {
            console.log(err);
            callback({ error: 'Could not reach OpenWeatherMap API.'});
        });
    }
}

module.exports = Weather;