import pool from "../../utils/MySQL/db.js";

//Add a new user
function newUser(req, res) {
	const { user_name, email, password } = req.body;
	pool.query(
		"INSERT INTO students_user (user_name, email, password) VALUES (?, ?, ?)",
		[user_name, email, password],
		(err) => {
			if (err) {
				console.error(err);
				return res.status(500).json({ error: "Error inserting user" });
			}
			return res.status(201).json({ message: "User created successfully" });
		}
	);
}

//Edit a user
function editUser(req, res) {
	const { user_id, user_name, email, password } = req.body;

	pool.query(
		"UPDATE students_user SET user_name = ?, email = ?, password = ? WHERE user_id = ?",
		[user_name, email, password, user_id],
		(err) => {
			if (err) {
				console.error(err);
				return res.status(500).json({ error: "Error updating user" });
			}

			return res.status(200).json({
				user_name: user_name,
				email: email,
				password: password,
			});
		}
	);
}

//For recall module
export { newUser, editUser };
