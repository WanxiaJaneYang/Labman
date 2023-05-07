import { errorMessages } from "../../../../utils/errorMessages";
import { fetchBorrowingRecord } from "./fetchBorrowingRecord.js";

async function updateReturnedAmount(connection, borrow_id, return_amount) {

	try {
		const borrowingRecord = await fetchBorrowingRecord(connection, borrow_id);
		const { borrow_amount, returned_amount } = borrowingRecord;
		if (return_amount > borrow_amount - returned_amount) {
			throw new Error(errorMessages.RETURN_AMOUNT_EXCEEDS_BORROW_AMOUNT);
		}
		const new_returned_amount = returned_amount + return_amount;
		const query = "UPDATE borrowings SET returned_amount = ? WHERE borrow_id = ?";
		await connection.query(query, [new_returned_amount, borrow_id]);

	} catch (error) {
		throw new Error("Failed update returned amount: " + error.message);
	}
}

export { updateReturnedAmount };
