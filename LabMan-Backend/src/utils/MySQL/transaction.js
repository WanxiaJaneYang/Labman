import pool from "./db.js";

function runTransaction(callback) {
	pool.getConnection((error, connection) => {
		if (error) {
			console.log(error);
		}
		try {
			connection.beginTransaction();
			callback(connection);
			connection.commit();
		} catch (error) {
			connection.rollback();
			console.log(error);
		} finally {
			connection.release();
		}
	});
}
export default runTransaction;