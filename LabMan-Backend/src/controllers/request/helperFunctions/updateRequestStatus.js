export async function updateRequestStatus(connection, request_id, request_status) {
    const updateStatusQuery = "UPDATE requests SET request_status = ? WHERE request_id = ?";
    try {
      return await connection.query(updateStatusQuery, [request_status, request_id]);
    } catch (error) {
      console.error(error);
      throw new Error("Error updating request status");
    }
  }