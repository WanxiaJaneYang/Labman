import pool from "../../utils/MySQL/db.js";

function editEquipment(req, res) {
  const { type_id } = req.params; // get equipment type ID from URL params
  const { type_name, total_amount, available_amount } = req.body; // get updated equipment details from request body

  // build query string and parameters based on which fields were provided in request body
  let query = "UPDATE equipment_type SET";
  let params = [];
  if (type_name) {
    query += " type_name = ?,";
    params.push(type_name);
  }
  if (total_amount !== undefined) {
    query += " total_amount = ?,";
    params.push(total_amount);
  }
  if (available_amount !== undefined) {
    query += " available_amount = ?,";
    params.push(available_amount);
  }
  // remove trailing comma
  query = query.slice(0, -1); 
  query += " WHERE type_id = ?";
  params.push(type_id);

  // execute query to update equipment in database
  pool.query(query, params, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Error editing equipment" });
    }
    if (results.affectedRows === 0) { // check if no rows were affected by update
      return res.status(404).json({ error: "Equipment not found" });
    }
    return res.status(200).json({ message: "Equipment edited successfully" });
  });
}

export { editEquipment };