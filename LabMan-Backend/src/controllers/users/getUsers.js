import pool from "../../utils/MySQL/db.js";

function getAllUsers(req, res) {
  pool.query("SELECT * FROM user", (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Error retrieving users" });
    }
    return res.status(200).json(results);
  });
};
  
  export  { getAllUsers };