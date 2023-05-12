import errorMessages from "../../../utils/constants/errorMessages.js";
import { getEquipmentById } from "./getEquipmentById.js";

export async function compareAvailableAmount(connection, type_id,amount) {
	try {
		const [result] = await getEquipmentById(connection, type_id);
		// console.log(result);
		const isAvailable = result.available_amount >= amount;
		// console.log(result.available_amount);

		if (!isAvailable) {
			throw new Error(errorMessages.NOT_ENOUGH_EQUIPMENT);
		}
		return isAvailable;
	} catch (error) {
		if (Object.values(errorMessages).includes(error.message)) {
			throw new Error(error.message);
		}
		throw new Error("Failed checking equipment availability: "+error.message);
	}
}