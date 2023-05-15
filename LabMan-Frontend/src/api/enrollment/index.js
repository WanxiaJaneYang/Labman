import axios from "axios";

const API_URL=process.env.REACT_APP_BASE_API_URL;
const API_URL_COURSE = API_URL+"/course";

export const getStudentList = async (course_id) => {
	const response = await axios.get(API_URL_COURSE+"/"+course_id+"/enrollment");
	if(response.status === 200){
		return response.data;
	}else{
		throw new Error(response.error);
	}
};

export const getStudentByStudentId = async (course_id, student_id) => {
	const response = await axios.get(API_URL_COURSE+"/"+course_id+"/student/"+student_id);
	if(response.status === 200){
		return response.data;
	}else{
		throw new Error(response.error);
	}
};

export const postStudents = async (course_id, value) => {
	const response = await axios.post(API_URL_COURSE+"/"+course_id+"/batch",value);
	if(response.status === 201){
		return;
	}else{
		throw new Error(response.error);
	}
};

export const deleteStudent = async (course_id, student_id) => {
	const response = await axios.delete(API_URL_COURSE+"/"+course_id+"/student/"+student_id);
	if(response.status === 200){
		return;
	}else{
		throw new Error(response.error);
	}
};

