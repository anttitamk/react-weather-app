// interface to interact with postgres instance
var { Pool } = require('pg');

// database connection
const CONNECTION_STRING = process.env.DATABASE_URL || 'postgresql://postgres:postgres@localhost:5432/weather-db';
// if the environment is production, SSL evaluates to true
// when app is deployed to heroku, heroku will set DATABASE_URL because heroku needs to connect to db that is running in their environment
// but during development the hardcoded postgres connection string will be used
const SSL = process.env.NODE_ENV === 'production';

// class methods
class Database {

    /*
    Constructor is called when new Database object is created in the end of this file. This will happen whenever we export our database into a new file to be used.
    Pool is created with connection string and ssl parameters. 
    Error handling applied for the pool. In case of an error it will be logged to console and process will be termninated and database connection killed.    
    */

    constructor () {
        this._pool = new Pool({
            connectionString: CONNECTION_STRING,
            ssl: SSL
        });

        this._pool.on('error', (err, client) => {
            console.error('Unexpected error on idle PostgreSQL client.', err);
            process.exit(-1);
        });
    }

    /*
    Connect method inside the pool variable that is set up in constructor above.
    If successful connection has been established, within that connection query() method will be called on the client with the actual query string, additional parameters and a callback as parameters.
    Error handling for the callback. If no errors, the rows from the db will be returned through a callback.
    */

    query (query, ...args) {
        this._pool.connect((err, client, done) => {
            if (err) throw err;
            const params = args.length === 2 ? args[0] : [];
            const callback = args.length === 1 ? args[0] : args[1];

            client.query(query, params, (err, res) => {
                done();
                if (err) {
                    console.log(err.stack);
                    return callback({ error: 'Database error.'}, null);
                }
                callback({}, res.rows);
            });
        });
    }

    // this ends the pool and will be called when the database connection is no longer needed

    end () {
        this._pool.end();
    }
}

module.exports = new Database();