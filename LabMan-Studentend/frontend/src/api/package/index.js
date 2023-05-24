import axios from "axios";

const API_URL=process.env.REACT_APP_BASE_API_URL;
const API_URL_PACKAGE=API_URL+"/package";

export const getPackageById = async ( package_id) => {
	const response = await axios.get(API_URL_PACKAGE+"/"+package_id);
	if(response.status === 200){
		return response.data;
	}else{
		throw new Error(response.error);
	}
};