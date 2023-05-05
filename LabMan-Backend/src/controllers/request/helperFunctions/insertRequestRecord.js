export async function insertRequestRecord(connection, requestRecord) {
	try {
		// Insert the record into the requests table
		const [result] = await connection.query("INSERT INTO requests SET ?", requestRecord);
		// Return the insert ID
		return result.insertId;
	} catch (error) {
		throw new Error("Failed to insert record into table requests");
	}
}