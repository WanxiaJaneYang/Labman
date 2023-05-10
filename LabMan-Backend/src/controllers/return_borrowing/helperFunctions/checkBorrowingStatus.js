import errorMessages from "../../../utils/constants/errorMessages.js";

async function statusIsBorrowed(connection, borrow_id) {
	const getBorrowingQuery = "SELECT * FROM borrowings WHERE borrow_id = ?";
	try {
		const [result] = await connection.query(getBorrowingQuery, [borrow_id]);
		if (result.length === 0) {
			throw new Error(errorMessages.BORROWING_DOESNOT_EXIST);
		}
		//console.log(result[0].request_status);
		if (result[0].borrow_status != 0) {
			throw new Error(errorMessages.BORROWING_STATUS_IS_NOT_BORROWED);
		}
	} catch (error) {
		if (Object.values(errorMessages).includes(error.message)) {
			throw new Error(error.message);
		}
		throw new Error("Failed checking borrowing's status: "+error.message);
	}	
}

async function statusIsReturned(connection, borrow_id) {
	const getBorrowingQuery = "SELECT * FROM borrowings WHERE borrow_id = ?";
	try {
		const [result] = await connection.query(getBorrowingQuery, [borrow_id]);
		if (result.length === 0) {
			throw new Error(errorMessages.BORROWING_DOESNOT_EXIST);
		}
		if (result[0].borrow_status === 0) {
			throw new Error(errorMessages.BORROWING_STATUS_IS_NOT_RETURNED);
		}
	} catch (error) {
		if (Object.values(errorMessages).includes(error.message)) {
			throw new Error(error.message);
		}
		throw new Error("Failed checking borrowing's status: "+error.message);
	}	
}

export { statusIsBorrowed, statusIsReturned };