const mysql = require('mysql');
const env = require('dotenv');

function connection() {
    var con = mysql.createConnection({
        host: process.env.DBHOST,
        user: process.env.DBUSER,
        password: process.env.DBPASSWD,
        database: process.env.DBNAME
    });
    return con;
}

module.exports = {
    connection: connection
}