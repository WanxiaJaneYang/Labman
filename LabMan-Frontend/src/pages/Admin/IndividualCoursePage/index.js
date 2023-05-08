import{ useParams } from "react-router-dom";

const IndividualCoursePage = () => {
	const { courseId: course_id } = useParams();
	return (
		<div>
			<h1> 
                Individual Course Page: {course_id}
			</h1>
		</div>
	);
};

export default IndividualCoursePage;