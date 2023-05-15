import axios from "axios";

const API_URL=process.env.REACT_APP_BASE_API_URL;
const API_URL_COURSE = API_URL+"/course";

export const getPackages = async (course_id) => {
	const response = await axios.get(API_URL_COURSE+"/"+course_id+"/package");
	if(response.status === 200){
		return response.data;
	}else{
		throw new Error(response.error);
	}
};

export const deletePackage = async (course_id, package_id) => {
	const response = await axios.delete(API_URL_COURSE+"/"+course_id+"/package/"+package_id);
	if(response.status === 200){
		return;
	}else{
		throw new Error(response.error);
	}
};

