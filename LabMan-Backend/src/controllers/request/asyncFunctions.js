
export function insertRequestLog(pool,requestLog) {
	const logQuery = "INSERT INTO request_log SET ?";
	return new Promise((resolve, reject) => {
		pool.query(logQuery, requestLog, (error, results) => {
			if (error) {
				reject(error);
			} else {
				resolve(results);
			}
		});
	});
}

export function insertEquipmentLog(pool,equipmentLog) {
	const logQuery = "INSERT INTO equipment_log SET ?";
	return new Promise((resolve, reject) => {
		pool.query(logQuery, equipmentLog, (error, results) => {
			if (error) {
				reject(error);
			} else {
				resolve(results);
			}
		});
	});
}

export function updateRequestStatus(pool,request_id,request_status) {
	const updateStatusQuery = "UPDATE requests SET request_status = ? WHERE request_id = ?";
	return new Promise((resolve, reject) => {
		pool.query(updateStatusQuery, [request_status, request_id], (error, results) => {
			if (error) {
				reject(error);
			} else {
				resolve(results);
			}
		});
	});
}

export function updateAvailableAmount(pool,type_id, available_amount) {
	const updateAmountQuery = "UPDATE equipment_type SET available_amount = available_amount - ? WHERE type_id = ?";
	return new Promise((resolve, reject) => {
		pool.query(updateAmountQuery, [available_amount, type_id], (error, results) => {
			if (error) {
				reject(error);
			} else {
				resolve(results);
			}
		});
	});
}

export function updateRemovableStatus(pool,type_id,removableStatus) {
	const updateRemovableQuery = "UPDATE equipment_type SET removable = ? WHERE type_id = ?";
	return new Promise((resolve, reject) => {
		pool.query(updateRemovableQuery, [removableStatus,type_id], (error, results) => {
			if (error) {
				reject(error);
			} else {
				resolve(results);
			}
		});
	});
}
