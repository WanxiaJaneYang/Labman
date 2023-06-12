import { getEquipmentById } from "./getEquipmentById.js";
import errorMessages from "../../../utils/constants/errorMessages.js";

export async function updateAvailableAmountAndRemovable(connection, type_id, change_amount) {
	try {
		const [current_info] = await getEquipmentById(connection, type_id);
		const new_available_amount = current_info.available_amount + change_amount;
		if (new_available_amount<0) {
			throw new Error(errorMessages.AVAILABLE_AMOUNT_CANNOT_BE_NEGATIVE);
		}
		const updateAmountQuery = "UPDATE equipment_type SET available_amount = new_available_amount WHERE type_id = ?";
		await connection.query(updateAmountQuery, [type_id]);

		const [equipment] = await getEquipmentById(connection, type_id);
		const removable = equipment.available_amount === equipment.total_amount ? 1 : 0;
        
		const updateRemovableQuery = "UPDATE equipment_type SET removable = ? WHERE type_id = ?";
		await connection.query(updateRemovableQuery, [removable, type_id]);
	} catch (error) {
		throw new Error("Failed updating Available Amount: " + error.message);
	}
}
