import errorMessages from "../../../utils/constants/errorMessages.js";

export async function getEquipmentById(connection, type_id) {
	const getEqptQuery = "SELECT * FROM equipment_type WHERE type_id = ?";
	try {
		const result = await connection.query(getEqptQuery, [type_id]);
		if (result.length === 0) {
			throw new Error(errorMessages.EQUIPMENT_TYPE_DOESNOT_EXIST);
		}
		// console.log(result[0]);
		return result[0];
	} catch (error) {
		if (Object.values(errorMessages).includes(error.message)) {
			throw new Error(error.message);
		}
		throw new Error("Interval error when get equipment type by id: "+error.message);
	}	
}