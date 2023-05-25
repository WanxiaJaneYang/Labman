import axios from "axios";

const API_URL=process.env.REACT_APP_BASE_API_URL;
const API_URL_REQUEST=API_URL+"/request";

export const postRequest=async (values)=>{
	const response=await axios.post(API_URL_REQUEST,values);
	if(response.status === 200){
		return;
	}else{
		throw new Error(response.error);
	}
};

export const getRequestListByStudentId=async ()=>{
	const student_id=localStorage.getItem("student_id");
	const searchValues = {
		"student_id": student_id,
		"request_status": 0,
	};
	const urlParams = new URLSearchParams(searchValues).toString();
	
	
	const response=await axios.get(API_URL_REQUEST+"?"+urlParams);
	if(response.status === 200){
		return response.data;
	}else{
		throw new Error(response.error);
	}
};