import axios from "axios";
const API_URL=process.env.REACT_APP_BASE_API_URL;
const API_URL_ANNOUNCEMENT = API_URL+"/announcement";

export const getAnnouncement = async () => {
	try{
		const response=await axios.get(API_URL_ANNOUNCEMENT);
		return response.data;
	}catch(error){
		if(error.response){
			throw new Error(error.response.data.error);
		}else{
			throw new Error(error.message);
		}
	}
};