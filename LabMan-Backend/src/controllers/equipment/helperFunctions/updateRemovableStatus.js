import { getEquipmentById } from "./getEquipmentById.js";

export async function updateRemovableStatus(connection, type_id, removableStatus) {
    try {
        await getEquipmentById(connection, type_id);
        const updateRemovableQuery = "UPDATE equipment_type SET removable = ? WHERE type_id = ?";
        return await connection.query(updateRemovableQuery, [removableStatus, type_id]);
    } catch (error) {
        throw new Error("Failed updating equipment removable status: " + error.message);
    }
}