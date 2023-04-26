import util from "util";

export async function insertRequestRecord(connection, requestRecord) {
	return new Promise((resolve, reject) => {
	  // Insert the record into the requests table
	  connection.query("INSERT INTO requests SET ?", requestRecord, async (error, result) => {
		if (error) {
		  console.error(error);
		  reject(new Error("Failed to insert record into table requests"));
		} else {
		  // Return the insert ID
		  resolve(result.insertId);
		}
	  });
	});
  }

export async function insertRequestLog(connection, requestLog) {
	const logQuery = "INSERT INTO request_log SET ?";
	const promiseQuery = util.promisify(connection.query).bind(connection);
	try {
		const results = await promiseQuery(logQuery, requestLog);
		console.log(results);
		return results;
	} catch (error) {
		throw new Error(error);
	}
}

export async function insertBorrowingRecords(connection, borrowingRequest, amount, current_time) {
	// Insert borrowingRecord into borrowings table N times with amount=1 per record
	for (let i = 0; i < amount; i++) {
		const query = "INSERT INTO borrowings SET ?";
		const promiseQuery = util.promisify(connection.query).bind(connection);
		const borrowRecord = {
			student_id: borrowingRequest.student_id,
			type_id: borrowingRequest.type_id,
			type_name: borrowingRequest.type_name,
			borrow_amount: 1,
			borrow_date: current_time,
			return_date: borrowingRequest.return_date,
			borrow_status: 0,//  0 = borrowed/unreturned
			request_id: borrowingRequest.request_id
		};
		try {
			const result = await promiseQuery(query, borrowRecord);
			const borrow_id = result.insertId;

			// creat a new log for new borrowings
			const borrowLog = {
				type_id: borrowingRequest.type_id,
				type_name: borrowingRequest.type_name,
				student_id: borrowingRequest.student_id,
				borrow_amount: 1,
				return_date: borrowingRequest.return_date,
				log_type: 1,  // 1 = borrow
				log_time: current_time,
				borrow_id: borrow_id // Use the request_id from the previous query
			};

			await insertEquipmentLog(connection, borrowLog);

		} catch (error) {
			console.error(error);
			throw new Error("Error inserting borrowing records");
		}
	}
}

export async function insertEquipmentLog(connection, equipmentLog) {
	const logQuery = "INSERT INTO equipment_log SET ?";
	const promiseQuery = util.promisify(connection.query).bind(connection);

	try {
		const results = await promiseQuery(logQuery, equipmentLog);
		return results;
	} catch (error) {
		throw new Error(error);
	}
}


export async function updateRequestStatus(connection, request_id, request_status) {
	const updateStatusQuery = "UPDATE requests SET request_status = ? WHERE request_id = ?";
	const promiseQuery = util.promisify(connection.query).bind(connection);

	try {
		const results = await promiseQuery(updateStatusQuery, [request_status, request_id]);
		return results;
	} catch (error) {
		throw new Error(error);
	}
}


export async function updateAvailableAmount(connection, type_id, available_amount) {
	const updateAmountQuery = "UPDATE equipment_type SET available_amount = available_amount - ? WHERE type_id = ?";
	const promiseQuery = util.promisify(connection.query).bind(connection);

	try {
		const results = await promiseQuery(updateAmountQuery, [available_amount, type_id]);
		return results;
	} catch (error) {
		throw new Error(error);
	}
}

export async function updateRemovableStatus(connection, type_id, removableStatus) {
	const updateRemovableQuery = "UPDATE equipment_type SET removable = ? WHERE type_id = ?";
	const promiseQuery = util.promisify(connection.query).bind(connection);

	try {
		const results = await promiseQuery(updateRemovableQuery, [removableStatus, type_id]);
		return results;
	} catch (error) {
		throw error;
	}
}

export async function updateRequest(connection, type_id, student_id, type_name, borrow_amount, return_date, request_id) {
	const updateSql = "UPDATE requests SET type_id=?, student_id=?, type_name=?, borrow_amount=?, return_date=? WHERE request_id=?";
	const promiseQuery = util.promisify(connection.query).bind(connection);

	try {
	  const result = await promiseQuery(updateSql, [type_id, student_id, type_name, borrow_amount, return_date, request_id]);
	  console.log(result);
	  return result;
	} catch (error) {
	  console.error(error);
	  throw new Error("Failed to update request");
	}
  }
  

