import pool from "../../utils/MySQL/db.js";

function getAllRequests(req, res) {
  pool.query("SELECT * FROM requests", (error, results) => {
    if (error) {
      console.error(error);
      return res.status(500).json({ error: "Error retrieving request records" });
    }
    return res.status(200).json(results);
  });
}
  
  export  { getAllRequests };