export async function insertEquipmentLog(connection, equipmentLog) {
	try {
		const logQuery = "INSERT INTO equipment_log SET ?";
		console.log(equipmentLog);
		await connection.query(logQuery, [equipmentLog]);
	} catch (error) {
		throw new Error("Failed inserting equipment log: " + error.message);
	}
}