import pool from "../../utils/MySQL/db.js";

function getAllUsers(req, res) {
  pool.query("SELECT * FROM students_user", (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Error retrieving users" });
    }
    return res.status(200).json(results);
  });
};

function getUserByName(req, res) {
  const { user_name } = req.params;
  pool.query("SELECT user_id, user_name, email FROM students_user WHERE user_name = ?", [user_name], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Error retrieving user" });
    }
    if (results.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }
    return res.status(200).json(results[0]);
  });
};

export { getAllUsers, getUserByName };
