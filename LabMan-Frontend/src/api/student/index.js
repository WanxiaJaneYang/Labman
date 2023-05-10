import axios from "axios";

const API_URL=process.env.REACT_APP_BASE_API_URL;
const API_URL_STUDENT=API_URL+"/users";

export const getStudentData=async ()=>{
	const response = await axios.get(API_URL_STUDENT);
	if(response.status === 200){
		return response.data;
	}else{
		throw new Error(response.error);
	}
};

export const postStudent=async (values)=>{
	const response = await axios.post(API_URL_STUDENT,values);
	if(response.status === 201){
		return;
	}else{
		throw new Error(response.error);
	}
};

export const deleteStudent=async (id)=>{
	const response = await axios.delete(API_URL_STUDENT+"/"+id);
	if(response.status === 200){
		return;
	}else{
		throw new Error(response.error);
	}
};

export const getStudentById=async (id)=>{
	const response = await axios.get(API_URL_STUDENT+"/"+id);
	if(response.status === 200){
		return response.data;
	}else{
		throw new Error(response.error);
	}
};
