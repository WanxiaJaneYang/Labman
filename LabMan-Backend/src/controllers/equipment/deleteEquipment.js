import pool from "../../utils/MySQL/db.js";

function deleteEquipment(req, res) {
  const type_id = req.params.type_id;
  pool.query(
    "DELETE FROM equipment_type WHERE type_id = ?",
    [type_id],
    (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Error deleting equipment" });
      }
      if (results.affectedRows === 0) {
        return res.status(404).json({ error: "Equipment not found" });
      }
      return res.status(200).json({ message: "Equipment deleted successfully" });
    }
  );
};

export { deleteEquipment };