import axios from "axios";

const API_URL=process.env.REACT_APP_BASE_API_URL;
const API_URL_LOG_EQUIPMENT=API_URL+"/logs/equipment";
const API_URL_LOG_REQUEST=API_URL+"/logs/request";

export const getEquipmentLog=async ()=>{
	const response=await axios.get(API_URL_LOG_EQUIPMENT);
	if(response.status === 200){
		return response.data;
	}else{
		throw new Error(response.error);
	}
};

export const getRequestLog=async ()=>{
	const response=await axios.get(API_URL_LOG_REQUEST);
	if(response.status === 200){
		return response.data;
	}else{
		throw new Error(response.error);
	}
};

export const getEquipmentLogByTypenameAndStudentId=async (values)=>{
	const urlParams= new URLSearchParams(values);
	const response=await axios.get(API_URL_LOG_EQUIPMENT+"?"+urlParams);
	if(response.status === 200){
		return response.data;
	}else{
		throw new Error(response.error);
	}
};

export const getRequestLogByTypenameAndStudentId=async (values)=>{
	const urlParams= new URLSearchParams(values);
	const response=await axios.get(API_URL_LOG_REQUEST+"?"+urlParams);
	if(response.status === 200){
		return response.data;
	}else{
		throw new Error(response.error);
	}
};