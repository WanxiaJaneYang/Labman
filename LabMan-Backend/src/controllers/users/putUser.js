import pool from "../../utils/MySQL/db.js";

function updateUser(req, res) {
	const {user_id}=req.params;
	const {user_name, email}=req.body;
	pool.query("UPDATE students_user SET user_name = ?, email = ? WHERE user_id = ?", [user_name, email, user_id], (err, results) => {
		if (err) {
			return res.status(500).json({error: "Error updating user"});
		}else if(results.affectedRows===0){
			return res.status(404).json({error: "User not found"});
		}else{
			return res.status(200).json({message: "User updated successfully"});
		}
	}
	);
}

export { updateUser };