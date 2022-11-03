"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
const mysql = require('mysql');
var connection = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    port: process.env.BD_PORT,
    password: process.env.BD_PASSWORD,
    database: process.env.DATANAME
});
connection.connect(function (error) {
    if (error) {
        return console.log("[mysql]" + error);
    }
    console.log("[mysql] conexión establecida");
});
exports.default = connection;
