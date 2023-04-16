import dotenv from "dotenv";
import mysql from "mysql";
import fs from "fs";

dotenv.config();

const pool = mysql.createPool({
    host: process.env.HOST,
    user: process.env.DBUSER,
    password: process.env.DBPASS,
    database: process.env.DBNAME,
    port: process.env.DBPORT,
    connectTimeout: 60000,
    ssl: {
      rejectUnauthorized: false,
      ca: fs.readFileSync("DigiCertGlobalRootCA.crt.pem")
    },
    acquireTimeout: 10000,
    waitForConnections: true
  });
  
function connectToDatabase() {
    return pool;
}
  
export {connectToDatabase};
export default pool;

