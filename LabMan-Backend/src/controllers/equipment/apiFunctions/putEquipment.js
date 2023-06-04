import pool from "../../../utils/MySQL/db.js";
import errorMessages from "../../../utils/constants/errorMessages.js";
import moment from "moment";
import { getEquipmentById } from "../helperFunctions/getEquipmentById.js";

async function editEquipment(req, res) {
	const { type_id } = req.params;
	const { type_name, total_amount } = req.body;
	const edit_time = moment().format("YYYY-MM-DD HH:mm:ss");

	try {
		const [equipment] = await getEquipmentById(pool, type_id);
		const change_amount = total_amount - equipment.total_amount;
		const new_available_amount = equipment.available_amount + change_amount;
		const query = "UPDATE equipment_type SET type_name = ?, total_amount = ? ,available_amount = ?,last_edit_time = ? WHERE type_id = ?";
		const params = [type_name, total_amount, new_available_amount,edit_time, type_id];

		const [results] = await pool.query(query, params);

		if (results.affectedRows === 0) {
			throw new Error(errorMessages.EQUIPMENT_TYPE_DOESNOT_EXIST);
		}

		return res.status(200).json({ message: "Equipment edited successfully" });
	} catch (error) {
		console.error(error);
		if (Object.values(errorMessages).includes(error.message)) {
			return res.status(400).json({ error: "Bad request: "+error.message });
		}
		return res.status(500).json({ error: "Internal error: " +error.message });
	}
}

export { editEquipment };
