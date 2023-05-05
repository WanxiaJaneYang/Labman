import axios from "axios";

export const getAllCourses = async () => {
	const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
	const COURSE_RESOURCE_PATH = "/course";

	try {
		const response = await axios.get(`${API_BASE_URL}${COURSE_RESOURCE_PATH}`);
		return { success: true, data: response.data, errorMessage: null };
	} catch (error) {
		const errorMessage = error.response && error.response.data
			? error.response.data.message
			: "Something went wrong. Please try again.";
		return { success: false, data: null, errorMessage };
	}
};
