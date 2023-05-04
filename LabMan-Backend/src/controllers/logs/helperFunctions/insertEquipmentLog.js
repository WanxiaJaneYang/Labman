export async function insertEquipmentLog(connection, equipmentLog) {
	const logQuery = "INSERT INTO equipment_log SET ?";
	try {
		const results = await connection.query(logQuery, [equipmentLog]);
		return results;
	} catch (error) {
		throw new Error("Error inserting equipment log");
	}
}