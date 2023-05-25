import axios from "axios";

const API_URL=process.env.REACT_APP_BASE_API_URL;
const API_URL_RETURN=API_URL+"/return";

export const getBorrowRecordByStudentId = async () => {
	const student_id = localStorage.getItem("student_id");
	const response = await axios.get(API_URL_RETURN, {
		params: {
			student_id: student_id,
			borrow_status: "0",
		},
	});
	if (response.status === 200) {
		const data = response.data;
		return data;
	}else{
		if(response.status === 404){
			return [];
		}else{
			const err = response.data;
			throw new Error(err.error);
		}
	}
};

export const getReturnedRecord= async () => {
	try{
		const student_id = localStorage.getItem("student_id");
		const response = await axios.get(API_URL_RETURN, {
			params: {
				student_id: student_id,
				borrow_status: "1",
			},
		});
		if (response.status === 200) {
			const data = response.data;
			return data;
		}
	}catch(error){
		if(error.response){
			throw new Error(error.response.data.error);
		}else{
			throw new Error(error.message);
		}
	}	
};