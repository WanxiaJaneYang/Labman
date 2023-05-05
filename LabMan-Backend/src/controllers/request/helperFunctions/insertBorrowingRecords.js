import { insertEquipmentLog } from "../../logs/helperFunctions/insertEquipmentLog.js";

export async function insertBorrowingRecords(connection, borrowingRequest, current_time) {
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
		throw new Error("Error inserting borrowing records");
	}
}