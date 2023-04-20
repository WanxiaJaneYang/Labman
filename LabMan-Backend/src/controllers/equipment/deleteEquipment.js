import pool from "../../utils/MySQL/db.js";

function deleteEquipment(req, res) {
  const type_id = req.params.type_id;

  // Check if the equipment can be deleted
  // According to kaini, err should the 0 is unreturn , 1 is return for borrow_status
  pool.query(
    "SELECT borrow_status FROM equipment_type WHERE type_id = ?",
    [type_id],
    (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Error checking equipment status" });
      }
      if (results[0].borrow_status === 0) {
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
      } else {
        return res.status(400).json({ error: "Equipment cannot be deleted" });
      }
    }
  );
};

export { deleteEquipment };
