import { insertEquipmentLog } from "../logs/asyncFuncLogs.js";

export async function insertRequestRecord(connection, requestRecord) {
  try {
    // Insert the record into the requests table
    const [result] = await connection.query("INSERT INTO requests SET ?", requestRecord);
    // Return the insert ID
    return result.insertId;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to insert record into table requests");
  }
}

export async function insertBorrowingRecords(connection, borrowingRequest,current_time) {
  try {
    const borrowRecord = {
      student_id: borrowingRequest.student_id,
      type_id: borrowingRequest.type_id,
      type_name: borrowingRequest.type_name,
      borrow_amount: borrowingRequest.borrow_amount,
      returned_amount: 0,
      borrow_date: current_time,
      return_date: borrowingRequest.return_date,
      borrow_status: 0, //  0 = borrowed/unreturned
      request_id: borrowingRequest.request_id,
    };
    const [result] = await connection.query("INSERT INTO borrowings SET ?", borrowRecord);
    const borrow_id = result.insertId;

    // create a new log for new borrowings
    const borrowLog = {
      type_id: borrowingRequest.type_id,
      type_name: borrowingRequest.type_name,
      student_id: borrowingRequest.student_id,
      borrow_amount: borrowingRequest.borrow_amount,
      returned_amount: 0,
      return_date: borrowingRequest.return_date,
      log_type: 1, // 1 = borrow
      log_time: current_time,
      borrow_id: borrow_id, // Use the request_id from the previous query
    };

    await insertEquipmentLog(connection, borrowLog);
  } catch (error) {
    console.error(error);
    throw new Error("Error inserting borrowing records");
  }
}

export async function updateRequestStatus(connection, request_id, request_status) {
  const updateStatusQuery = "UPDATE requests SET request_status = ? WHERE request_id = ?";
  try {
    const [results] = await connection.query(updateStatusQuery, [request_status, request_id]);
    return results;
  } catch (error) {
	console.error(error);
    throw new Error("Error updating request status");
  }
}

export async function updateRequest(connection, type_id, student_id, type_name, borrow_amount, return_date, request_id) {
  const updateSql = "UPDATE requests SET type_id=?, student_id=?, type_name=?, borrow_amount=?, return_date=? WHERE request_id=?";
  try {
    const [result] = await connection.query(updateSql, [type_id, student_id, type_name, borrow_amount, return_date, request_id]);
    //console.log(result);
    return result;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to update request");
  }
}
