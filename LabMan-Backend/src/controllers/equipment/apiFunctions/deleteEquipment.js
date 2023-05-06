import pool from "../../../utils/MySQL/db.js";
import { checkEquipmentRemovable } from "../helperFunctions/checkEquipmentRemovable.js";
import errorMessages from "../../../utils/constants/errorMessages.js";

async function deleteEquipment(req, res) {
	const type_id = req.params.type_id;

	try {
		const removable = await checkEquipmentRemovable(pool, type_id);

		if (removable === 0) {
			res.status(400).json({ error: "Equipment is not removable" });
		} else {
			const query = "DELETE FROM equipment_type WHERE type_id = ?";
			const params = [type_id];

			await pool.query(query, params);

			return res.status(200).json({ message: "Equipment is deleted successfully" });
		}
	} catch (error) {
		console.error(error);
		if (Object.values(errorMessages).includes(error.message)) {
			throw new Error(error.message);
		}
		return res.status(500).json({ error: error.message });
	}
}


export { deleteEquipment };
