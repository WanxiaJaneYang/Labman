async function fetchBorrowingRecord(connection, borrow_id) {
	return new Promise((resolve, reject) => {
		const query = "SELECT * FROM borrowings WHERE borrow_id = ?";
		connection.query(query, [borrow_id], (err, results) => {
			if (err) {
				reject(err);
			} else {
				resolve(results[0]);
			}
		});
	});
}

export { fetchBorrowingRecord };
