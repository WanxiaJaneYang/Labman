import dotenv from "dotenv";
import fs from "fs";
import mysql from "mysql2/promise";
import { fileURLToPath } from "url";

dotenv.config();
const __dirname = fileURLToPath(new URL(import.meta.url)).replace(/\\/g, "/").split("/").slice(0, -1).join("/");

const pool = mysql.createPool({
	host: "localhost",
	user: "root",
	password: "Adelaide123N",
	database: "labman",
	port: 3306,
	ssl: {
		rejectUnauthorized: false,
	},
	connectTimeout: 60000,
});
console.log("Connection pool object created successfully");

async function connectToDatabase() {
	let connection;
	try {
		connection = await pool.getConnection();
		console.log("database is connectable");
	} catch (error) {
		console.error("database is not connectable", error);
	} finally {
		if (connection) {
			connection.release();
		}
	}
	return pool;
}

export {connectToDatabase};
export default pool;
