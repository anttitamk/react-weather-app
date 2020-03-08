const db = require('../database');

class Cities {
    static retrieveAll(callback) {
        db.query('SELECT city_name FROM cities', (err, res) => {
            if (err.error)
                return callback(err);
            callback(res);
        })
    }

    static insert (city, callback) {
        db.query(`INSERT INTO cities (city_name)
                  SELECT '${city}'
                  WHERE
                  NOT EXISTS (
                      SELECT * FROM cities WHERE city_name = '${city}'
                  )
                  PRINT @@ROWCOUNT`, 
                (err, res) => {
            if (err.error)
                return callback(err);
            callback(res);
        })
    }

    static delete (city, callback) {
        db.query('DELETE FROM cities WHERE city_name = $1', [city], (err, res) => {
            if (err.error)
                return callback(err);
            callback(res);
        })
    }
}

module.exports = Cities;