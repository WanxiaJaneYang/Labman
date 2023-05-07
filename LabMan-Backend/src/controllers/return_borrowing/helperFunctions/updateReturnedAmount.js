import errorMessages from "../../../utils/constants/errorMessages.js";
import { fetchBorrowingRecord } from "./fetchBorrowingRecord.js";

async function updateReturnedAmount(connection, borrow_id, return_amount) {

	try {
		const [borrowingRecord] = await fetchBorrowingRecord(connection, borrow_id);
		//console.log(borrowingRecord);
		if (return_amount > borrowingRecord.borrow_amount - borrowingRecord.returned_amount) {
			throw new Error(errorMessages.RETURN_AMOUNT_EXCEEDS_BORROW_AMOUNT);
		}
		//console.log(borrowingRecord.returned_amount);

		const new_returned_amount = borrowingRecord.returned_amount + return_amount;
		//console.log(new_returned_amount);
		const query = "UPDATE borrowings SET returned_amount = ? WHERE borrow_id = ?";
		await connection.query(query, [new_returned_amount, borrow_id]);

	} catch (error) {
		throw new Error("Failed update returned amount: " + error.message);
	}
}

export { updateReturnedAmount };
