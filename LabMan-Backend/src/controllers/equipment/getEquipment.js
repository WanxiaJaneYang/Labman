import pool from "../../utils/MySQL/db.js";

function getAllEquipmentTypes(req, res) {
    pool.query("SELECT * FROM equipment_type", (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Error retrieving equipment types" });
      }
      return res.status(200).json(results);
    });
  };
  
  export  { getAllEquipmentTypes };