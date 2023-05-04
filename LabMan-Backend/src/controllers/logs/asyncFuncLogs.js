

export async function insertRequestLog(connection, requestLog) {
	const logQuery = "INSERT INTO request_log SET ?";
	try {
		const results = await connection.query(logQuery, [requestLog]);
		//console.log(results);
		return results;
	} catch (error) {
		console.error(error);
		throw new Error("Error inserting request log");
	}
}

export async function insertEquipmentLog(connection, equipmentLog) {
	const logQuery = "INSERT INTO equipment_log SET ?";
	try {
		const results = await connection.query(logQuery, [equipmentLog]);
		return results;
	} catch (error) {
		console.error(error);
		throw new Error("Error inserting equipment log");
	}
}
