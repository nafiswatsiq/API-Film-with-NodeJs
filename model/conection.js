require('dotenv').config()
const {DB_USERNAME, DB_PASSWORD, DB_HOST, DB_NAME} = process.env;

const mysql = require('mysql');

const db = mysql.createPool({
    host: DB_HOST,
    user: DB_USERNAME,
    password: DB_PASSWORD,
    database: DB_NAME
});

exports.db = db;