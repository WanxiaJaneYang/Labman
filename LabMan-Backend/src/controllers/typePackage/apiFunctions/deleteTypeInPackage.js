import pool from "../../../utils/MySQL/db.js";
import errorMessages from "../../../utils/constants/errorMessages.js";
import { checkPackageExists } from "../../coursePackage/helperFunctions/checkPackageExists.js";
import { checkTypeExistsInPackage } from "../helperFunctions/checkTypeExistsInPackage.js";

async function deleteTypeInPackage(req, res) {
	try {
		const { package_id, type_id } = req.params;
		await checkPackageExists(pool, package_id);
        await checkTypeExistsInPackage(pool, package_id,type_id);
		const query = "DELETE FROM type_package WHERE type_id = ? ";
		await pool.query(query, type_id);

		return res.status(200).json({ message: "Type deleted successfully from package" });
	} catch (error) {
		console.error(error);
		if (Object.values(errorMessages).includes(error.message)) {
			return res.status(400).json({ error: "Bad request: " + error.message });
		}
		return res.status(500).json({ error: "Internal error: " + error.message });
	}
}

// For recall module
export { deleteTypeInPackage };
