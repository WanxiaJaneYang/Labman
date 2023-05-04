async function updateReturnedAmount(connection, borrow_id, borrowingRecord, return_amount) {
	return new Promise((resolve, reject) => {
		const new_returned_amount = borrowingRecord.returned_amount + return_amount;
		const borrow_status = new_returned_amount === borrowingRecord.borrow_amount ? 1 : 0;
		const query = "UPDATE borrowings SET returned_amount = ?, borrow_status = ? WHERE borrow_id = ?";
		connection.query(query, [new_returned_amount, borrow_status, borrow_id], (err, results) => {
			if (err) {
				reject(err);
			} else {
				resolve(results);
			}
		});
	});
}

export { updateReturnedAmount };
