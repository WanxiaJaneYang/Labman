export async function insertRequestLog(connection, requestLog) {
	try {
		const logQuery = "INSERT INTO request_log SET ?";
		await connection.query(logQuery, [requestLog]);
	} catch (error) {
		throw new Error("Internal error when inserting request log: " + error.message);
	}
}