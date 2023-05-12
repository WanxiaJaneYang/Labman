import pool from "../../../utils/MySQL/db.js";
import errorMessages from "../../../utils/constants/errorMessages.js";

async function getEquipmentTypes(req, res) {
	if (req.query.type_name) {
		return getEquipmentTypeByName(req, res);
	} else {
		try {
			const [results] = await pool.query("SELECT * FROM equipment_type");
			//404 if no equipment types exist
			if (results.length === 0) {
				return res.status(404).json(errorMessages.EQUIPMENT_TYPE_DOESNOT_EXIST);
			}
			return res.status(200).json(results);
		} catch (error) {
			console.error(error);
			if (Object.values(errorMessages).includes(error.message)) {
				return res.status(400).json({ error: "Bad request: "+error.message });
			}
			return res.status(500).json({ error: "Error retrieving equipment types" });
		}
	}
}

async function getEquipmentTypeByName(req, res) {
	const type_name = req.query.type_name;

	try {
		const query = "SELECT * FROM equipment_type WHERE LOWER(type_name) = LOWER(?)";
		const params = [type_name];

		const [results] = await pool.query(query, params);

		if (results.length === 0) {
			throw new Error(errorMessages.EQUIPMENT_TYPE_DOESNOT_EXIST);
		}

		return res.status(200).json(results);
	} catch (error) {
		console.error(error);
		if (Object.values(errorMessages).includes(error.message)) {
			return res.status(404).json({ error: "Bad request: "+error.message });
		}
		return res.status(500).json({ error: "Internal error: " +error.message });
	}
}

export { getEquipmentTypes };