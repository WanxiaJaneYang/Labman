import errorMessages from "../../../utils/constants/errorMessages.js";
import { getEquipmentById } from "./getEquipmentById.js";

export async function compareReservedAmount(connection, type_id,amount) {
	try {
		const result=await getEquipmentById(connection, type_id);
		const isAvailable = result[0].reserved_amount >= amount;

		if (!isAvailable) {
			throw new Error(errorMessages.NOT_ENOUGH_EQUIPMENT_FOR_COLLECT);
		}
		return isAvailable;
	} catch (error) {
		if (Object.values(errorMessages).includes(error.message)) {
			throw new Error(error.message);
		}
		throw new Error("Failed checking equipment reservation: " + error.message);
	}
}