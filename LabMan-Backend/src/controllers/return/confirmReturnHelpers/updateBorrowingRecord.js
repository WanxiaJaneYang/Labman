// confirmReturnHelpers/updateBorrowingRecord.js
async function updateBorrowingRecord(connection, borrow_id, returned_amount, borrow_status) {
	return new Promise((resolve, reject) => {
		const query = "UPDATE borrowings SET returned_amount = ?, borrow_status = ? WHERE borrow_id = ?";
		connection.query(query, [returned_amount, borrow_status, borrow_id], (err, results) => {
			if (err) {
				reject(err);
			} else {
				resolve(results);
			}
		});
	});
}

export { updateBorrowingRecord };
