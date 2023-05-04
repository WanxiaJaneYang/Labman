import util from "util";

export async function updateAvailableAmount(connection, type_id, available_amount) {
	const updateAmountQuery = "UPDATE equipment_type SET available_amount = available_amount - ? WHERE type_id = ?";
	const promiseQuery = util.promisify(connection.query).bind(connection);

	try {
		const results = await promiseQuery(updateAmountQuery, [available_amount, type_id]);
		return results;
	} catch (error) {
		throw new Error(error);
	}
}

export async function updateRemovableStatus(connection, type_id, removableStatus) {
	const updateRemovableQuery = "UPDATE equipment_type SET removable = ? WHERE type_id = ?";
	const promiseQuery = util.promisify(connection.query).bind(connection);

	try {
		const results = await promiseQuery(updateRemovableQuery, [removableStatus, type_id]);
		return results;
	} catch (error) {
		console.log(error);
	}
}