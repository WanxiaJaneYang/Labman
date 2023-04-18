import dotenv from "dotenv";
import fs from "fs";
import mysql from "mysql";
import { fileURLToPath } from "url";

// import mysql from 'mysql2/promise';

dotenv.config();
const __dirname = fileURLToPath(new URL(import.meta.url)).replace(/\\/g, "/").split("/").slice(0, -1).join("/");

const pool = mysql.createPool({
	host: "labman.mysql.database.azure.com",
	user: "a1866621",
	password: "Adelaide123N",
	database: "labman",
	port: 3306,

	// host: process.env.HOST,
	// user: process.env.DBUSER,
	// password: process.env.DBPASS,
	// database: process.env.DBNAME,
	// port: process.env.DBPORT,
	ssl: {
		rejectUnauthorized: true,
		ca: fs.readFileSync(`${__dirname}/DigiCertGlobalRootCA.crt.pem`)
	},
	connectTimeout:60000,

});
console.log("Connection pool object created successfully");


pool.getConnection((err, connection) => {
	if (err) {
		console.error("database is not connectable: ", err);
	} else {
		console.log("database is connectable ");
		connection.release();
	}
});

function connectToDatabase() {
	return pool;
}

export { connectToDatabase };
export default pool;

