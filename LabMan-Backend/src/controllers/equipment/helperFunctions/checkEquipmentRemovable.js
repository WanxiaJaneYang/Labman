import errorMessages from "../../../utils/constants/errorMessages.js";
import { getEquipmentById } from "./getEquipmentById.js";

async function checkEquipmentRemovable(pool,type_id) {
	try {
		const query = "SELECT removable FROM equipment_type WHERE type_id = ?";
		const params = [type_id];
		await getEquipmentById(pool, type_id);
		const [results] = await pool.query(query, params);
		if (results.length === 0) {
			throw new Error(errorMessages.EQUIPMENT_TYPE_DOESNOT_EXIST);
		}
		const removable = results[0].removable;
		return removable;
	} catch (error) {
		throw new Error("Failed checking equipment removable: " + error.message);
	}
}

export { checkEquipmentRemovable };