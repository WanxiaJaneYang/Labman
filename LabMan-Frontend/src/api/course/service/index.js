import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
const API_URL_COURSE = API_BASE_URL+"/course";

export const getAllCourses = async () => {
	const response = await axios.get(API_URL_COURSE);
	if(response.status === 200){
		return response.data;
	}else{
		throw new Error(response.error);
	}
};

export const getCourseByCoursenameAndCoordinator = async (course_name, coordinator_name) => {
	const urlParmas = new URLSearchParams();
	urlParmas.append("course_name",course_name);
	urlParmas.append("coordinator_name",coordinator_name);
	const response = await axios.get(API_URL_COURSE+"?"+urlParmas.toString());
	if(response.status === 200){
		return response.data;
	}else{
		throw new Error(response.error);
	}
};

export const getCourseById = async (id) => {
	const response = await axios.get(API_URL_COURSE+"/"+id);
	if(response.status === 200){
		return response.data;
	}else{
		throw new Error(response.error);
	}
};

export const postCourse = async (values) => {
	const response = await axios.post(API_URL_COURSE,values);
	if(response.status === 201){
		return;
	}else{
		throw new Error(response.error);
	}
};

export const deleteCourse = async (id) => {
	const response = await axios.delete(API_URL_COURSE+"/"+id);
	if(response.status === 200){
		return;
	}else{
		throw new Error(response.error);
	}
};

export const editCourse = async (id,values) => {
	const response = await axios.put(API_URL_COURSE+"/"+id,values);
	if(response.status === 200){
		return;
	}else{
		throw new Error(response.error);
	}
};