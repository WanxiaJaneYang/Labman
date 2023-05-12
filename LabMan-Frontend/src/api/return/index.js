import axios from "axios";

const API_URL=process.env.REACT_APP_BASE_API_URL;
const API_URL_RETURN=API_URL+"/return";

export const getBorrowedRecords = async () => {
	const response = await axios.get(API_URL_RETURN, {
		params: {
			borrow_status: "0",
		},
	});
	if (response.status === 200) {
		const data = response.data;
		return data;
	}else{
		const err = response.data;
		throw new Error(err.error);
	} 
};

export const getReturnedRecords = async () => {
	const response = await axios.get(API_URL_RETURN, {
		params: {
			borrow_status: "1",
		},
	});
	if (response.status === 200) {
		const data = response.data;
		return data;
	}else{
		const err = response.data;
		throw new Error(err.error);
	}
};

export const searchReturnedRecord= async (values) => {
	const urlParams = new URLSearchParams(values);
	urlParams.append("borrow_status", "1");
	const response = await axios.get(API_URL_RETURN+"?"+urlParams);
	if (response.status === 200) {
		const data = response.data;
		return data;
	}else{
		const err = response.data;
		throw new Error(err.error);
	}
};

export const confirmReturn = async (borrow_id, return_amount) => {
	const response = await axios.patch(API_URL_RETURN+"/"+borrow_id+"?return_amount="+return_amount);
	if (response.status === 200) {
		return;
	} else {
		const err = response.data;
		throw new Error(err.error);
	}
};

export const cancelReturnedRecord = async (borrow_id) => {
	const response = await axios.patch(API_URL_RETURN+"/cancel/"+borrow_id);
	if (response.status === 200) {
		return;
	} else {
		const err = response.data;
		throw new Error(err.error);
	}
};

export const searchBorrowRecord = async (values) => {
	const urlParams = new URLSearchParams(values);
	urlParams.append("borrow_status", "0");
	const response = await axios.get(API_URL_RETURN+"?"+urlParams);
	if (response.status === 200) {
		const data = response.data;
		return data;
	}else{
		const err = response.data;
		throw new Error(err.error);
	} 
};