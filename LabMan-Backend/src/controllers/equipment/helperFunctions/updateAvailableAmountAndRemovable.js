import { getEquipmentById } from "./getEquipmentById.js";

export async function updateAvailableAmountAndRemovable(connection, type_id, change_amount) {
    try {
        const equipment = await getEquipmentById(connection, type_id);
        const updateAmountQuery = "UPDATE equipment_type SET available_amount = available_amount - ? WHERE type_id = ?";
        await connection.query(updateAmountQuery, [change_amount, type_id]);

        const removable = equipment.available_amount === equipment.total_amount;
        const updateRemovableQuery = "UPDATE equipment_type SET removable = ? WHERE type_id = ?";
        await connection.query(updateRemovableQuery, [removable, type_id]);
    } catch (error) {
        throw new Error("Failed updating Available Amount: " + error.message);
    }
}
