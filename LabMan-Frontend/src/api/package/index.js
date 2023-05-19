import axios from "axios";

const API_URL=process.env.REACT_APP_BASE_API_URL;
const API_URL_COURSE = API_URL+"/course";
const API_URL_PACKAGE = API_URL+"/package";

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

export const getPackageById = async ( package_id) => {
	const response = await axios.get(API_URL_PACKAGE+"/"+package_id);
	if(response.status === 200){
		return response.data;
	}else{
		throw new Error(response.error);
	}
};

export const getEquipmentInPackage = async (package_id, type_id) => {
	const response = await axios.get(API_URL_PACKAGE+"/"+package_id+"/"+type_id);
	if(response.status === 200){
		return response.data;
	}else{
		throw new Error(response.error);
	}
};

export const addEquipment = async (package_id, type_id, values) => {
	const response = await axios.post(API_URL_PACKAGE+"/"+package_id+"/"+type_id, values);
	if(response.status === 201){
		return ;
	}else{
		throw new Error(response.error);
	}
};

export const deleteEquipment = async (package_id, type_id) => {
	const response = await axios.delete(API_URL_PACKAGE+"/"+package_id+"/"+type_id);
	if(response.status === 200){
		return;
	}else{
		throw new Error(response.error);
	}
};

export const editEquipment = async (package_id, type_id,values) => {
	const response = await axios.put(API_URL_PACKAGE+"/"+package_id+"/"+type_id, values);
	if(response.status === 200){
		return;
	}else{
		throw new Error(response.error);
	}
};

