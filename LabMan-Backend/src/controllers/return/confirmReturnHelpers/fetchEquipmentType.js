async function fetchEquipmentTypeRecord(connection, type_id) {
	return new Promise((resolve, reject) => {
		const query = "SELECT * FROM equipment_type WHERE type_id = ?";
		connection.query(query, [type_id], (err, results) => {
			if (err) {
				reject(err);
			} else {
				resolve(results[0]);
			}
		});
	});
}

export { fetchEquipmentTypeRecord };
