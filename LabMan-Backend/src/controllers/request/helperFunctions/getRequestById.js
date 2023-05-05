export async function getRequestById(connection, request_id) {
	const getRequestQuery = "SELECT * FROM requests WHERE request_id = ?";
	try {
		const [result] = await connection.query(getRequestQuery, [request_id]);
		if (result.length === 0) {
			throw new Error("Request does not exist");
		}
		return result[0];
	} catch (error) {
		throw new Error("Error get request records by id");
	}
}