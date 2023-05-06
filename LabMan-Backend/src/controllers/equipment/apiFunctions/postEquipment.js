import pool from "../../../utils/MySQL/db.js";
import errorMessages from "../../../utils/constants/errorMessages.js";

async function newEquipmentType(req, res) {
	const { type_name, total_amount, available_amount } = req.body;
	const removable = true;

	try {
		await pool.query(
			"INSERT INTO equipment_type (type_name, total_amount, available_amount, removable) VALUES (?, ?, ?, ?)",
			[type_name, total_amount, available_amount, removable]
		);

		return res.status(20).json({ message: "Equipment type created successfully" });
	} catch (error) {
		console.error(error);
		if (Object.values(errorMessages).includes(error.message)) {
			throw new Error(error.message);
		}
		return res.status(500).json({ error: error.message });
	}
}

export { newEquipmentType };