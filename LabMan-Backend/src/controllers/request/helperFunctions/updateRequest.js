export async function updateRequest(connection, type_id, student_id, type_name, borrow_amount, return_date, request_id) {
	try{const updateSql = "UPDATE requests SET type_id=?, student_id=?, type_name=?, borrow_amount=?, return_date=? WHERE request_id=?";
	await connection.query(updateSql, [type_id, student_id, type_name, borrow_amount, return_date, request_id]);
	}catch(error){
		throw new Error("Error updating request: " + error.message);
	}
}