import errorMessages from "../../../utils/constants/errorMessages.js";
import { fetchBorrowingRecord } from "./fetchBorrowingRecord.js";

async function updateReturnedAmount(connection, borrow_id, return_amount) {

	try {
		const [borrowingRecord] = await fetchBorrowingRecord(connection, borrow_id);
		console.log("borrow: "+borrowingRecord.borrow_amount);
		console.log("returned: "+borrowingRecord.returned_amount);
		console.log("return :"+return_amount);
		if (return_amount > borrowingRecord.borrow_amount - borrowingRecord.returned_amount) {
			throw new Error(errorMessages.RETURN_AMOUNT_EXCEEDS_BORROW_AMOUNT);
		}

		const new_returned_amount = borrowingRecord.returned_amount + return_amount;
		//console.log(new_returned_amount);
		const query = "UPDATE borrowings SET returned_amount = ?,actual_return_date = ? WHERE borrow_id = ?";
		await connection.query(query, [new_returned_amount, new Date(),borrow_id]);

	} catch (error) {
		if (Object.values(errorMessages).includes(error.message)) {
			throw new Error(error.message);
		}
		throw new Error("Failed update returned amount: " + error.message);
	}
}

export { updateReturnedAmount };
