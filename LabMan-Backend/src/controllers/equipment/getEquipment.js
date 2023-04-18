import pool from "../../utils/MySQL/db.js";

function getAllEquipmentTypes(req, res) {
	if (req.query.type_name) {
		return getEquipmentByTypeName(req, res);
	}else{
		pool.query("SELECT * FROM equipment_type", (err, results) => {
			if (err) {
				return res.status(500).json({ error: "Error retrieving equipment types"});
			}
			return res.status(200).json(results);
		});
	}
}

function getEquipmentByTypeName(req, res) {
	const type_name = req.query.type_name;
	pool.query(
		"SELECT * FROM equipment_type WHERE LOWER(type_name) = LOWER(?)",
		[type_name],
		(err, results) => {
			if (err) {
				return res.status(500).json({ error: "Error retrieving equipment types" });
			}
			return res.status(200).json(results);
		}
	);
}

export  { getAllEquipmentTypes };