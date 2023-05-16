import pool from "../../../utils/MySQL/db.js";
import errorMessages from "../../../utils/constants/errorMessages.js";
// import { checkEnrollmentDuplicate } from "../helperFunctions/checkEnrollmentDuplicate.js";

async function newTypePackage(req, res) {
	const { package_id, type_id } = req.params;

	try {
		// await checkEnrollmentDuplicate(pool, package_id, type_id);

		const query = "INSERT INTO type_package (package_id, type_id) VALUES (?, ?)";
		const params = [package_id, type_id];
		await pool.query(query, params);

		return res.status(201).json({ message: "type package created successfully" });
	} catch (error) {
		console.error(error);
		if (Object.values(errorMessages).includes(error.message)) {
			return res.status(400).json({ error: "Bad request: " + error.message });
		}
		return res.status(500).json({ error: "Internal error: " + error.message });
	}
}

export { newTypePackage };

