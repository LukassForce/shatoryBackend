require('dotenv').config({ path: "../.env"});
const mysql = require('mysql');

var connection = mysql.createConnection({

    host    : process.env.HOST,
    user    : process.env.USER,
    port    : process.env.BD_PORT,
    password: process.env.BD_PASSWORD,
    database: process.env.DATANAME
});


connection.connect(function(error:any){

    if(error){
        return console.log("[mysql] error: " + error) 
    }
    console.log("[mysql] conexión establecida")
});

export default connection;