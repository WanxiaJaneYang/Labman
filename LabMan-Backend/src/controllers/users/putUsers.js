import pool from "../../utils/MySQL/db.js";

//Edit a user
function editUser(req, res) {
  const { user_id, user_name, email, password } = req.body;

  pool.query(
    "UPDATE students_user SET user_name = ?, email = ?, password = ? WHERE user_id = ?",
    [user_name, email, password, user_id],
    (err, results) => {
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

//Recall module
export  { editUser };
