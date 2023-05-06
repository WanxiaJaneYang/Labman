export async function updateRequestStatus(connection, request_id, request_status) {
	try{const updateStatusQuery = "UPDATE requests SET request_status = ? WHERE request_id = ?";
	return await connection.query(updateStatusQuery, [request_status, request_id]);
	}catch(error){
		throw new Error("Error updating request status: " + error.message);
	}
}