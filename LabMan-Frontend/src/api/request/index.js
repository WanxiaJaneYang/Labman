import axios from "axios";

const API_URL=process.env.REACT_APP_BASE_API_URL;
const API_URL_REQUEST=API_URL+"/request";

export const getPendingRequest=async ()=>{
	const urlParams = new URLSearchParams({request_status:0}).toString();
	const response=await axios.get(API_URL_REQUEST+"?"+urlParams);
	if(response.status === 200){
		return response.data;
	}else{
		throw new Error(response.error);
	}
};

export const getPendingRequestByTypenameAndStudentId=async (values)=>{
	const urlParams= new URLSearchParams(values);
	urlParams.append("request_status",0);
	const response=await axios.get(API_URL_REQUEST+"?"+urlParams);
	if(response.status === 200){
		return response.data;
	}else{
		throw new Error(response.error);
	}
};

export const postRequest=async (values)=>{
	const response=await axios.post(API_URL_REQUEST,values);
	if(response.status === 200){
		return;
	}else{
		throw new Error(response.error);
	}
};

export const putRequest=async (values)=>{
	const response=await axios.put(API_URL_REQUEST+"/"+values.request_id,values);
	if(response.status === 200){
		return;
	}else{
		throw new Error(response.error);
	}
};

export const cancelRequest=async (request_id, values)=>{
	const response=await axios.patch(API_URL_REQUEST+"/cancel/"+request_id, values);
	if(response.status === 200){
		return;
	}else{
		throw new Error(response.error);
	}
};

export const collectRequest=async (request_id)=>{
	const response=await axios.patch(API_URL_REQUEST+"/collect/"+request_id);
	if(response.status === 200){
		return;
	}else{
		throw new Error(response.error);
	}
};