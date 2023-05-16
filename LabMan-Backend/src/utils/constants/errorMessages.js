const errorMessages = {
	//request
	REQUEST_DOESNOT_EXIST: "The request does not exist",
	REQUEST_REQUIRED_FIELD_INVALID: "Required information for request",
	REQUEST_STATUS_IS_NOT_NEW: "The request status is not new",
	BORROW_REQUIRED_FIELD_INVALID: "Required information for collecting is invalid",

	//student
	STUDENT_DOESNOT_EXIST: "The student does not exist",
	DUPLICATE_USER: "Duplicate user",

	//equipment
	EQUIPMENT_TYPE_DOESNOT_EXIST: "The equipment type does not exist",
	NOT_ENOUGH_EQUIPMENT: "Not enough equipment available",
	EQUIPMENT_LOG_REQUIRED_FIELD_INVALID: "Required information for equipment borrowing is invalid",
	EQUIPMENT_TYPE_NOT_REMOVABLE: "Equipment type is not removable",

	//borrowing
	REQUEST_STATUS_IS_NOT_COLLECTED: "The request status is not collected",
	BORROWING_DOESNOT_EXIST: "The borrowing does not exist",
	BORROWING_STATUS_IS_NOT_BORROWED: "The borrowing status is not borrowed",
	BORROWING_STATUS_IS_NOT_RETURNED: "The borrowing status is not returned",
	RETURN_AMOUNT_EXCEEDS_BORROW_AMOUNT: "The return amount exceeds the borrow amount",





	













	//type package
	TPYE_IN_PACKAGE_NOT_FOUND:"No equipment type in this package",
};

export default errorMessages;