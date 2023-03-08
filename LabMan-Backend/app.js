import express from "express";
import mysql from "mysql";
import fs from "fs";
const app = express();

var config =
{
  host:"labman.mysql.database.azure.com", 
  user:"a1866621", 
  password:"Adelaide123N", 
  database:"labman", 
  port:3306, 
  ssl: {    rejectUnauthorized: false,
    ca: fs.readFileSync("./BaltimoreCyberTrustRoot.crt.pem", "utf8")}
};
const conn = new mysql.createConnection(config);

conn.connect(
    function (err) { 
    if (err) { 
        console.log("!!! Cannot connect !!! Error:");
        throw err;
    }
    else
    {
       console.log("Connection established.");
        //    queryDatabase();
    }
});

app.use(express.json());

export default app;