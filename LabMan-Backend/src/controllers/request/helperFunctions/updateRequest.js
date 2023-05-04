export async function updateRequest(connection, type_id, student_id, type_name, borrow_amount, return_date, request_id) {
    const updateSql = "UPDATE requests SET type_id=?, student_id=?, type_name=?, borrow_amount=?, return_date=? WHERE request_id=?";
    try {
      const [result] = await connection.query(updateSql, [type_id, student_id, type_name, borrow_amount, return_date, request_id]);
      //console.log(result);
      return result;
    } catch (error) {
      throw new Error("Failed to update request");
    }
  }