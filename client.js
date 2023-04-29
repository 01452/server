
const { Client } = require('pg');

const client = new Client({
    connectionString: 'postgres://xrsidddo:l3Zr7WJ4-QR0kpTKImyUH35B9tIt0w4E@hattie.db.elephantsql.com/xrsidddo',
    ssl: {
        rejectUnauthorized: false
    }
});

module.exports = client;