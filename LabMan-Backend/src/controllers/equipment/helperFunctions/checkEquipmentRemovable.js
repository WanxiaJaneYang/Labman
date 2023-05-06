import errorMessages from "../../../utils/constants/errorMessages.js";

async function checkEquipmentRemovable(pool,type_id) {
    const query = "SELECT removable FROM equipment_type WHERE type_id = ?";
    const params = [type_id];
    try {
      const [results] = await pool.query(query, params);
      if (results.length === 0) {
        throw new Error(errorMessages.EQUIPMENT_TYPE_DOESNOT_EXIST);
      }
      const removable = results[0].removable;
      return removable;
    } catch (error) {
      throw new Error("Error checking equipment removable: " + error.message);
    }
  };

  export { checkEquipmentRemovable };