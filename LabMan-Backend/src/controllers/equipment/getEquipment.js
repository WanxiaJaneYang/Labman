import pool from "../../utils/MySQL/db.js";

function getEquipmentTypes(req, res) {
	if (req.query.type_name) {
		return getEquipmentTypeByName(req, res);
	} else {
		pool.query("SELECT * FROM equipment_type", (err, results) => {
			if (err) {
				return res.status(500).json({ error: "Error retrieving equipment types" });
			}
			return res.status(200).json(results);
		});
	}
}

function getEquipmentTypeByName(req, res) {
	const type_name = req.query.type_name;
	pool.query(
		"SELECT * FROM equipment_type WHERE LOWER(type_name) = LOWER(?)",
		[type_name],
		(err, results) => {
			if (err) {
				return res.status(500).json({ error: "Error retrieving equipment types" });
			} else if (results.length === 0) {
				return res.status(404).json({ error: "Equipment type not found" });
			}
			return res.status(200).json(results);
		}
	);
}

export { getEquipmentTypes };