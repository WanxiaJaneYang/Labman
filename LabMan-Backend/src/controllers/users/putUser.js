import pool from "../../utils/MySQL/db.js";

function updateUser(req, res) {
	const {user_id}=req.params;
	console.log("user_id",user_id);
	const {user_name, email, password}=req.body;
	console.log("user_name",user_name);
	console.log("email",email);
	console.log("password",password);
	pool.query("UPDATE students_user SET user_name = ?, email = ?, password = ? WHERE user_id = ?", [user_name, email, password, user_id], (err, results) => {
		if (err) {
			console.error(err);
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