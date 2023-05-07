export async function insertEquipmentLog(connection, equipmentLog) {
	try {
		const logQuery = "INSERT INTO equipment_log SET ?";
		await connection.query(logQuery, [equipmentLog]);
	} catch (error) {
		throw new Error("Internal error when inserting equipment log: " + error.message);
	}
}