var express = require('express');
var Cities = require('../models/cities');

// module that handles all the middleware for a particular part of the backend, in this case cities data
var router = express.Router();


/* 
basic mechanism for express middleware
request object to get more information
data will be returned to frontend as json using response
get request to this router will return cities
*/
router.get('/', (req, res) => {
    Cities.retrieveAll((err, cities) => {
        if (err)
            return res.json(err);
        return res.json(cities);
    });
});

router.post('/', (req, res) => {
    var city = req.body.city;
    Cities.insert(city, (err, result) => {
        if (err)
            return res.json(err);
        return res.json(result);
    });
});

module.exports = router;