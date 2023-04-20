import pool from "../../utils/MySQL/db.js";

async function deleteEquipment(req, res) {
	const type_id = req.params.type_id;

	checkEquipmentRemovable(type_id, (err, removable) => {
		if (err && err.message === "Equipment type not found") {
			res.status(404).json({ error: "Equipment type not found" });
		}else if (err) {
			res.status(500).json({ error: err.message });
		}else if (removable === 0) {
			res.status(400).json({error: "Equipment is not removable" });
		}else{
			const query = "DELETE FROM equipment_type WHERE type_id = ?";
			const params = [type_id];

			pool.query(query, params, (err) => {
				if (err) {
					res.status(500).json({ error: "Error deleting equipment" });
				}else{
					res.status(200).json({ message: "Equipment deleted" });
				}
			});
		}
	});
}

const checkEquipmentRemovable = (type_id, callback) => {
	const query = "SELECT removable FROM equipment_type WHERE type_id = ?";
	const params = [type_id];

	pool.query(query, params, (err, results) => {
		if (err) {
			callback(new Error("Error checking equipment removable"));
		}else if (results.length === 0) {
			callback(new Error("Equipment type not found"));
		}else{
			const removable = results[0].removable;
			callback(null, removable);
		}
	});
};

export { deleteEquipment };