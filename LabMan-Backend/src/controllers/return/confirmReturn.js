import pool from "../../utils/MySQL/db.js";

const confirmReturn = (req, res) => {
	const borrow_id = req.params.borrow_id;

	const query = "UPDATE borrowings SET borrow_status = 1 WHERE borrow_id = ?";

	pool.query(query, [borrow_id], (err, results) => {
		if (err) {
			console.error(err);
			return res.status(500).json({ error: "Error updating borrow_status" });
		}

		if (results.affectedRows === 0) {
			return res.status(404).json({ error: "Borrowing not found" });
		}

		return res.status(200).json({ message: "Borrow status successfully updated" });
	});
};

export { confirmReturn };
