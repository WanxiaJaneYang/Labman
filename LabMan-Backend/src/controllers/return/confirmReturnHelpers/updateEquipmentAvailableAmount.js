async function updateEquipmentAvailableAmount(connection, type_id, available_amount) {
	return new Promise((resolve, reject) => {
		const query = `
			UPDATE equipment_type
			SET available_amount = ?
			WHERE type_id = ?`;
		connection.query(query, [available_amount, type_id], (err, results) => {
			if (err) {
				reject(err);
			} else {
				resolve(results);
			}
		});
	});
}

export { updateEquipmentAvailableAmount };
