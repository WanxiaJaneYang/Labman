import pool from "../../utils/MySQL/db.js";

function deleteEquipment(req, res) {
	const type_id = req.params.type_id;
	pool.query(
		"DELETE FROM equipment_type WHERE type_id = ?",
		[type_id],
		(err, results) => {
			if (err) {
				return res.status(500).json({ message: "Cannot delete or update this equipment type as it is currently in use by other records.", errorDetails: err.message });
			}
			if (results.affectedRows === 0) {
				return res.status(404).json({ error: "Equipment not found" });
			}
			return res.status(200).json({ message: "Equipment deleted successfully" });
		}
	);
}

export { deleteEquipment };