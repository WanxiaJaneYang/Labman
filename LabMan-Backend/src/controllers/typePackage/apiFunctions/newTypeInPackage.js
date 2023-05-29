import pool from "../../../utils/MySQL/db.js";
import errorMessages from "../../../utils/constants/errorMessages.js";
import { checkTypeInPackageDuplicate } from "../helperFunctions/checkTypeInPackageDuplicate.js";
import moment from "moment";

async function newTypeInPackage(req, res) {
	try {
		const { package_id, type_id } = req.params;
		const { type_name, upper_bound_amount } = req.body;
		const add_time = moment().format("YYYY-MM-DD HH:mm:ss");

		await checkTypeInPackageDuplicate(pool, package_id, type_id);
		const query = "INSERT INTO type_package (package_id, type_id,type_name, upper_bound_amount,last_edit_time ) VALUES (?, ?,?,?,?)";
		const params = [package_id, type_id,type_name, upper_bound_amount,add_time];
		await pool.query(query, params);

		return res.status(201).json({ message: "new type in package created successfully" });
	} catch (error) {
		console.error(error);
		if (Object.values(errorMessages).includes(error.message)) {
			return res.status(400).json({ error: "Bad request: " + error.message });
		}
		return res.status(500).json({ error: "Internal error: " + error.message });
	}
}

export { newTypeInPackage };
