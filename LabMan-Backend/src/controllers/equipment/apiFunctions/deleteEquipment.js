import pool from "../../../utils/MySQL/db.js";
import { checkEquipmentRemovable } from "../helperFunctions/checkEquipmentRemovable.js";
import errorMessages from "../../../utils/constants/errorMessages.js";

async function deleteEquipment(req, res) {
	try {
		const type_id = req.params.type_id;
		const removable = await checkEquipmentRemovable(pool, type_id);

		if (removable === 0) {
			throw new Error(errorMessages.EQUIPMENT_TYPE_NOT_REMOVABLE);
		} else {
			const query = "DELETE FROM equipment_type WHERE type_id = ?";
			const params = [type_id];
			await pool.query(query, params);

			return res.status(200).json({ message: "Equipment is deleted successfully" });
		}
	} catch (error) {
		console.error(error);
		if (Object.values(errorMessages).includes(error.message)) {
			return res.status(400).json({ error: "Bad request: "+error.message });
		}
		return res.status(500).json({ error: "Internal error: " +error.message });
	}
}

export { deleteEquipment };
