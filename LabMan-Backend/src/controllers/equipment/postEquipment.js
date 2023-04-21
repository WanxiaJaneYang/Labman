import pool from "../../utils/MySQL/db.js";

function newEquipmentType(req, res) {
	const { type_name, total_amount, available_amount } = req.body;
	const removable = true;

	pool.query(
		"INSERT INTO equipment_type (type_name, total_amount,available_amount, removable) VALUES (?, ?, ?, ?)",
		[type_name, total_amount, available_amount, removable],
		(err) => {
			if (err) {
				console.error(err);
				return res.status(500).json({ error: "Error inserting equipment type" });
			}
			return res.status(201).json({ message: "Equipment type created successfully" });
		}
	);
}

export { newEquipmentType };