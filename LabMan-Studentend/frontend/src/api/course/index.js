import axios from "axios";

const API_URL=process.env.REACT_APP_BASE_API_URL;
const API_URL_COURSE = API_URL+"/course";
const API_URL_STUDENT = API_URL+"/course/student/";

export const getCourseListByStudentId = async (student_id) => {
	try{
		const response=await axios.get(API_URL_STUDENT+student_id);
		return response.data;
	}catch(error){
		if(error.response){
			throw new Error(error.response.data.error);
		}else{
			throw new Error(error.message);
		}
	}
};

export const getCoursePackageListByCourseId = async (course_id) => {
	const response = await axios.get(API_URL_COURSE+"/"+course_id+"/package");
	if(response.status === 200){
		return response.data;
	}else{
		throw new Error(response.error);
	}
};