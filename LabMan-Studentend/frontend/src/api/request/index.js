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