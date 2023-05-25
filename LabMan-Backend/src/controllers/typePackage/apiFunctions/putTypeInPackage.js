import pool from "../../../utils/MySQL/db.js";
import errorMessages from "../../../utils/constants/errorMessages.js";
import moment from "moment";
import { checkTypeExistsInPackage} from "../helperFunctions/checkTypeExistsInPackage.js";

async function updateTypeInPackage(req, res) {
	const { package_id, type_id} = req.params;
	const { type_name,upper_bound_amount } = req.body;

	const last_edit_time = moment().format("YYYY-MM-DD HH:mm:ss");

	try {
		await checkTypeExistsInPackage(pool, package_id, type_id);

		const query = "UPDATE type_package SET type_name=?,upper_bound_amount = ?, last_edit_time = ? WHERE package_id = ? AND type_id = ?";
		const params = [type_name,upper_bound_amount,last_edit_time, package_id, type_id];
		await pool.query(query, params);

		return res.status(200).json({ message: "type info in package updated successfully" });
	} catch (error) {
		console.error(error);
		if (Object.values(errorMessages).includes(error.message)) {
			return res.status(404).json({ error: "Bad request: " + error.message });
		}
		return res.status(500).json({ error: "Internal error: " + error.message });
	}
}

export { updateTypeInPackage };
