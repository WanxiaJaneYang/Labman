export async function updateReservedAmount(connection, type_id, change_amount) {
	try {
		const updateAmountQuery = "UPDATE equipment_type SET reserved_amount = reserved_amount + ? WHERE type_id = ?";
		await connection.query(updateAmountQuery, [change_amount, type_id]);

	} catch (error) {
		throw new Error("Failed updating Reserved Amount: " + error.message);
	}
}