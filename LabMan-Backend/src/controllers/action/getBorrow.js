import pool from "../../utils/MySQL/db.js";

function getAllBorrow(req, res) {
  pool.query("SELECT * FROM borrowings", (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Error retrieving borrow records" });
    }
    return res.status(200).json(results);
  });
}
  
  export  { getAllBorrow };