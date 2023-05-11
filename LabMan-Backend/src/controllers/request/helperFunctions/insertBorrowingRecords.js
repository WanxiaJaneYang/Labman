import errorMessages from "../../../utils/constants/errorMessages.js";
import { insertEquipmentLog } from "../../logs/helperFunctions/insertEquipmentLog.js";
import moment from "moment";

export async function insertBorrowingRecords(connection, borrowingRequest) {
	try {
		const borrowRecord = {
			student_id: borrowingRequest.student_id,
			type_id: borrowingRequest.type_id,
			type_name: borrowingRequest.type_name,
			borrow_amount: borrowingRequest.borrow_amount,
			returned_amount: 0,
			borrow_date: moment().format("YYYY-MM-DD HH:mm:ss"),
			return_date: borrowingRequest.return_date,
			borrow_status: 0, //  0 = borrowed/unreturned
			request_id: borrowingRequest.request_id,
		};
		const [result] = await connection.query("INSERT INTO borrowings SET ?", borrowRecord);
		//console.log(result)
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
			log_time: moment().format("YYYY-MM-DD HH:mm:ss"),
			borrow_id: borrow_id, // Use the request_id from the previous query
		};

		await insertEquipmentLog(connection, borrowLog);

	} catch (error) {
		if (Object.values(errorMessages).includes(error.message)) {
			throw new Error(error.message);
		}
		throw new Error("Failed inserting borrowing record: " + error.message);
	}
}