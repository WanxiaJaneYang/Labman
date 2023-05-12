import { useContext, useState, createContext } from "react";
import { message } from "antd";
import { getCourseById, editCourse } from "../../../../api/course/service";
import { useNavigate } from "react-router-dom";

const CourseDetailContext = createContext();

export const useCourseDetailContext = () => {
	return useContext(CourseDetailContext);
};

const CourseDetailProvider = ({children, course_id}) => {
	const navigate = useNavigate();
	const [course, setCourse] = useState({
		course_id: course_id,
		course_name: "Foundation of Computer Science",
		coordinator_name: "Cruz Lzu",
	});
	const [loading, setLoading] = useState(false);

	const fetchCourse = async () => {
		setLoading(true);
		getCourseById(course_id).then((data) => {
			setCourse(data);
		}).catch((err) => {
			message.error(err.message);
		});
		setLoading(false);
	};

	const onStudentListClick = () => {
		navigate("/admin/course/"+course_id+"/student_list");
	};

	const onPackageListClick = () => {
		navigate("/admin/course/"+course_id+"/package_list");
	};

	const changeCourseName = (course_name) => {
		const newCourse = {
			...course,
			course_name: course_name,
		};
		editCourse(course_id, newCourse).then( fetchCourse() ).catch((err) => {
			message.error(err.message);
		});
	};

	const changeCoordinatorName = (coordinator_name) => {
		const newCourse = {
			...course,
			coordinator_name: coordinator_name,
		};
		editCourse(course_id, newCourse).then( fetchCourse() ).catch((err) => {
			message.error(err.message);
		});
	};

	return (
		<>
			<CourseDetailContext.Provider value={{
				loading,
				course,
				setCourse,
				changeCourseName,
				changeCoordinatorName,
				onStudentListClick,
				onPackageListClick,
				fetchCourse,
			}}>
				{children}
			</CourseDetailContext.Provider>

		</>
	);
};

export default CourseDetailProvider;
