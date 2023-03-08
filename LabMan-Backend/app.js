import express from "express";
import mysql from "mysql";
import fs from "fs";
const app = express();

const pool = mysql.createPool({

  host:"labman.mysql.database.azure.com", 
  user:"a1866621", 
  password:"Adelaide123N", 
  database:"labman", 
  port:3306, 
  connectTimeout: 60000,
  ssl: {   
    rejectUnauthorized: false,
    // ca: fs.readFileSync("./DigiCertGlobalRootCA.crt.pem")
}
});
pool.getConnection(function(err, connection) {
    if (err) { 
        console.log("!!! Cannot connect !!! Error:");
        throw err;
    }    else
    {
       console.log("Connection established.");
            readData(connection);
    }

  // perform database operations using the connection

//   connection.release(); // release the connection back to the pool
});


function readData(connection){
    connection.query('SELECT * FROM test', 
        function (err, results, fields) {
            if (err) throw err;
            else console.log(results);
            console.log('Done.');
        })
        connection.release(
        function (err) { 
            if (err) throw err;
            else  console.log('Closing connection.') 
    });
};
app.use(express.json());

export default app;