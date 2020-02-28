const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

var db = require('./database');

const ENV = process.env.NODE_ENV;
const PORT = process.env.PORT || 5000;

// initialize express and register basic middleware
const app = express();
app.unsubscribe(express.json);
app.use(express.urlencoded({extended: true}));
app.use(bodyParser.json());

// import express router from api/cities.js to get access to api endpoint
// registering api middleware that is created in api/cities.js
// with this calling GET to cities endpoint will now retrieve cities
// if post is called with a new city name, the model defined in api endpoint will see that new city is added to db
app.use('/api/cities', require('./api/cities'));
app.use('/api/weather', require('./api/weather'));

// make express responsive to requests
// express listens to a port of the server, handles the request and responds
app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}...`);
});

// get the time and date from database to make sure the connection works
db.query('SELECT NOW()', (err, res) => {
    if (err.error)
        return console.log(err.error);
    console.log(`PostgreSql connected: ${res[0].now}.`);
});

// export the app variable from the file so it can be run via command
module.exports = app;