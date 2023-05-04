export async function checkRequestExists(connection, request_id) {
    const getRequestQuery = "SELECT * FROM requests WHERE request_id = ?";
    try {
      const [result] = await connection.query(getRequestQuery, [request_id]);
      if (result.length === 0) {
        throw new Error("Request does not exist");
      }
    } catch (error) {
      throw new Error("Error checking if request exists");
    }
  }