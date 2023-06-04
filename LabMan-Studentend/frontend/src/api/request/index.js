import axios from "axios";

const API_URL = process.env.REACT_APP_BASE_API_URL;
const API_URL_REQUEST = API_URL + "/request";

export const postRequest = async (values) => {
	try {
		const response = await axios.post(API_URL_REQUEST, values);
		if (response.status === 201) {
			return;
		}
	} catch (error) {
		if (error.response && error.response.data) {
			throw new Error(error.response.data.error);
		} else {
			throw new Error(error.message);
		}
	}
};

export const getRequestListByStudentId = async () => {
	const student_id = localStorage.getItem("student_id");
	const searchValues = {
		"student_id": student_id,
		"request_status": 0,
	};
	const urlParams = new URLSearchParams(searchValues).toString();

	try {
		const response = await axios.get(API_URL_REQUEST + "?" + urlParams);
		if (response.status === 200) {
			return response.data;
		}
	} catch (error) {
		if (error.response) {
			if(error.response.status===404){
				return [];
			}else{
				throw new Error(error.response.data.message);
			}
		} else {
			throw new Error(error.message);
		}
	}
};

export const putRequest = async (request_id, values) => {
	try {
		const response = await axios.put(API_URL_REQUEST + "/" + request_id, values);
		if (response.status === 200) {
			return;
		}
	} catch (error) {
		if (error.response) {
			throw new Error(error.response.data.error);
		} else {
			throw new Error(error.message);
		}
	}
};

export const cancelRequest = async (request_id, values) => {
	try {
		const response = await axios.patch(API_URL_REQUEST + "/cancel/" + request_id, values);
		if (response.status === 200) {
			return;
		}
	} catch (error) {
		if (error.response && error.response.data) {
			throw new Error(error.response.data.message);
		} else {
			throw new Error(error.message);
		}
	}
};