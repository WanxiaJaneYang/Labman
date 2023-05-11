import pool from "../../../utils/MySQL/db.js";
import errorMessages from "../../../utils/constants/errorMessages.js";
import moment from "moment";

async function newEquipmentType(req, res) {
	const { type_name, total_amount, available_amount } = req.body;
	const removable = true;
	const reserved_amount = 0;
	const added_time = moment().format("YYYY-MM-DD HH:mm:ss");
	try {
		await pool.query(
			"INSERT INTO equipment_type (type_name, total_amount, available_amount, removable,reserved_amount,last_edit_time) VALUES (?, ?,?, ?, ?,?)",
			[type_name, total_amount, available_amount, removable,reserved_amount,added_time]
		);

		return res.status(201).json({ message: "Equipment type created successfully" });
	} catch (error) {
		console.error(error);
		if (Object.values(errorMessages).includes(error.message)) {
			return res.status(404).json({ error: "Bad request: "+error.message });
		}
		return res.status(500).json({ error: "Internal error: " +error.message });
	}
}

export { newEquipmentType };