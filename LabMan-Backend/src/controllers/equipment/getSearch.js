import pool from "../../utils/MySQL/db.js";

function searchEquipment(req, res) {
  const keyword = req.query.keyword;

  if (!keyword) {
    return res.status(400).json({ error: "Keyword is required" });
  }

  pool.query(
    "SELECT * FROM equipment_type WHERE type_name LIKE ?",
    [`%${keyword}%`],
    (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Error retrieving equipment types" });
      }
      return res.status(200).json({ equipments: results });
    }
  );
}

export { searchEquipment };
