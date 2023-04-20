import pool from "../../utils/MySQL/db.js";

//Delete a user
function deleteUser(req, res) {
	const student_id = req.params.student_id;
  
	pool.query("DELETE FROM students_user WHERE student_id = ?", [student_id], (err, results) => {
		if (err) {
			return res.status(500).json({ error: "Error deleting user" });
		}
    
		if (results.affectedRows === 0) {
			return res.status(404).json({ error: "User not found" });
		}
    
		return res.status(200).json({ message: "User deleted successfully" });
	});
}

export { deleteUser };
