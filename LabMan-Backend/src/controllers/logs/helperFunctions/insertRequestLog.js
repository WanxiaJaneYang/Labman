export async function insertRequestLog(connection, requestLog) {
	const logQuery = "INSERT INTO request_log SET ?";
	try {
		const results = await connection.query(logQuery, [requestLog]);
		//console.log(results);
		return results;
	} catch (error) {
		throw new Error("Error inserting request log");
	}
}