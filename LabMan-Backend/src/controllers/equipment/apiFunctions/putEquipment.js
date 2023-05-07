import pool from "../../../utils/MySQL/db.js";
import errorMessages from "../../../utils/constants/errorMessages.js";

async function editEquipment(req, res) {
	const { type_id } = req.params;
	const { type_name, total_amount, available_amount } = req.body;

	try {
		const query = "UPDATE equipment_type SET type_name = ?, total_amount = ?, available_amount = ? WHERE type_id = ?";
		const params = [type_name, total_amount, available_amount, type_id];

		const [results] = await pool.query(query, params);

		if (results.affectedRows === 0) {
			throw new Error(errorMessages.EQUIPMENT_TYPE_DOESNOT_EXIST);
		}

		return res.status(200).json({ message: "Equipment edited successfully" });
	} catch (error) {
		console.error(error);
		if (Object.values(errorMessages).includes(error.message)) {
			return res.status(404).json({ error: "Bad request: "+error.message });
		}
		return res.status(500).json({ error: "Internal error: " +error.message });
	}
}

export { editEquipment };
