async function updateBorrowingStatus(connection, borrow_id, status) {
	try {
		const query = "UPDATE borrowings SET borrow_status = ? WHERE borrow_id = ?";
		await connection.query(query, [status, borrow_id]);

	} catch (error) {
		if (Object.values(errorMessages).includes(error.message)) {
			throw new Error(error.message);
		}
		throw new Error("Failed update borrowing status: " + error.message);
	}
}

export { updateBorrowingStatus };