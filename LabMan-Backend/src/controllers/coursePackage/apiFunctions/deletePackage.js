import pool from "../../../utils/MySQL/db.js";
import errorMessages from "../../../utils/constants/errorMessages.js";
import { checkPackageExists } from "../helperFunctions/checkPackageExists.js";

async function deletePackage(req, res) {
	const { package_id } = req.params;

	try {
		await checkPackageExists(pool, package_id);
		const query = "DELETE FROM course_package WHERE package_id = ?";
		const params = [package_id];
		await pool.query(query, params);

		return res.status(200).json({ message: "Package is deleted successfully" });
	} catch (error) {
		console.error(error);
		if (Object.values(errorMessages).includes(error.message)) {
			return res.status(400).json({ error: "Bad request: " + error.message });
		}
		return res.status(500).json({ error: "Internal error: " + error.message });
	}
}

// For recall module
export { deletePackage };
