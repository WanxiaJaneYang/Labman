import { useParams } from "react-router-dom";

const StudentListPage = () => {
	const { course_id } = useParams();
	return (
		<div>
			<h1>
                Student List Page: {course_id}
			</h1>
		</div>
	);
};

export default StudentListPage;