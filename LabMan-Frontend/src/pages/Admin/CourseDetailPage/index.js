import {Descriptions} from "antd";
import { useParams, useNavigate } from "react-router-dom";

const CourseDetailPage = () => {
	const {course_id} = useParams();
	const navigate = useNavigate();
	const onStudentListClick = () => {
		navigate("/admin/course/"+course_id+"/student_list");
	};
	const onPackageListClick = () => {
		navigate("/admin/course/"+course_id+"/package_list");
	};
	
	return(
		<>
			<Descriptions bordered column={2}>
				<Descriptions.Item label="Course Code" span={2}>COMP SCI 7001</Descriptions.Item>
				<Descriptions.Item label="Course Title" span={2}>Foundation of Computer Science</Descriptions.Item>
				<Descriptions.Item label="Course Coordinator" span={2}>Cruz Lzu</Descriptions.Item>
				<Descriptions.Item label="Course Description" span={2}>This course is designed to provide students with a broad overview of the field of computer science</Descriptions.Item>
				<Descriptions.Item label="Enrolled Students" span={2}>
					<a onClick={onStudentListClick}>Student List</a>
				</Descriptions.Item>
				<Descriptions.Item label="Entitled Packages" span={2}>
					<a onClick={onPackageListClick}>Package List</a>
				</Descriptions.Item>
			</Descriptions>    
		</>
	);
};

export default CourseDetailPage;