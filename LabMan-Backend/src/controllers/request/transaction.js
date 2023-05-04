import pool from "../../utils/MySQL/db.js";

async function runTransaction(callback) {
	const connection = await pool.getConnection();
	try {
	  await connection.beginTransaction();
	  await callback(connection);
	  await connection.commit();
	} catch (error) {
	  await connection.rollback();
	  throw error;
	} finally {
	  connection.release();
	}
  }

export default runTransaction;
