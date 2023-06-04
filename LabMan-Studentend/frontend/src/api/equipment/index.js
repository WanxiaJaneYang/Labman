import axios from "axios";

const API_URL=process.env.REACT_APP_BASE_API_URL;
const API_URL_EQUIPMENT=API_URL+"/equipment";

export const getAvailableAmount=async (type_name)=>{
	const urlParmas=new URLSearchParams();
	urlParmas.append("type_name",type_name);
	try{
		const response = await axios.get(API_URL_EQUIPMENT+"?"+urlParmas.toString());
		if(response.status === 200){
			return response.data[0].available_amount;
		}
	}catch(error){
		if(error.response){
			throw new Error(error.response.data.error);
		}else{
			throw new Error(error.message);
		}
	}
};