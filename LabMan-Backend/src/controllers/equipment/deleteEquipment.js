import pool from "../../utils/MySQL/db.js";

async function deleteEquipment(req, res) {
	const type_id = req.params.type_id;

	try {
		const removable = await checkEquipmentRemovable(type_id);

		if (removable === 0) {
			res.status(400).json({ error: "Equipment is not removable" });
		} else {
			const query = "DELETE FROM equipment_type WHERE type_id = ?";
			const params = [type_id];

			await pool.query(query, params, (err) => {
				if (err) {
					return res.status(500).json({ error: "Error deleting equipment" });
				} else {
					return res.status(200).json({ message: "Equipment deleted" });
				}
			});
		}
	} catch (err) {
		if (err.message === "Equipment type not found") {
			res.status(404).json({ error: "Equipment type not found" });
		} else {
			res.status(500).json({ error: err.message });
		}
	}
}

const checkEquipmentRemovable = async (type_id) => {
	return new Promise((resolve, reject) => {
		const query = "SELECT removable FROM equipment_type WHERE type_id = ?";
		const params = [type_id];

		pool.query(query, params, (err, results) => {
			if (err) {
				reject(new Error("Error checking equipment removable"));
			} else if (results.length === 0) {
				reject(new Error("Equipment type not found"));
			} else {
				const removable = results[0].removable;
				resolve(removable);
			}
		});
	});
};

export { deleteEquipment };
