
export async function updateAvailableAmount(connection, type_id, available_amount) {
	const updateAmountQuery = "UPDATE equipment_type SET available_amount = available_amount - ? WHERE type_id = ?";

	try {
		const results = await connection.query(updateAmountQuery, [available_amount, type_id]);
		return results;
	} catch (error) {
		console.error(error);
		throw new Error("failed to update Available Amount");
	}
}

export async function updateRemovableStatus(connection, type_id, removableStatus) {
	const updateRemovableQuery = "UPDATE equipment_type SET removable = ? WHERE type_id = ?";

	try {
		const result = await connection.query(updateRemovableQuery, [removableStatus, type_id]);
		console.log(result);
		return;
	} catch (error) {
		console.error(error);
		throw new Error("failed to update Removable Status");
	}
}

export async function compareAvailableAmount(connection, type_id,amount) {
	const getAvailableAmount = "SELECT * FROM equipment_type WHERE type_id = ?";

	try {
		const [result] = await connection.query(getAvailableAmount, [type_id]);
		const isAvailable = result[0].available_amount >= amount;
		// console.log(type_id);
		// console.log(result);
		// console.log(amount);
		// console.log(isAvailable);
		if (!isAvailable) {
			throw new Error("Not enough equipment available" );
		}
	} catch (error) {
		console.error(error);
		throw error;
	}
}