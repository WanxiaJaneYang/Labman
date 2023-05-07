import { getEquipmentById } from "./getEquipmentById.js";

export async function updateAvailableAmount(connection, type_id, available_amount) {
    try {
        await getEquipmentById(connection, type_id);
        const updateAmountQuery = "UPDATE equipment_type SET available_amount = available_amount - ? WHERE type_id = ?";
        return await connection.query(updateAmountQuery, [available_amount, type_id]);
    } catch (error) {
        throw new Error("Internal error when updating Available Amount: " + error.message);
    }
}