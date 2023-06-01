import { Card, Descriptions, Space, message, Empty } from "antd";
import { useEffect, useState } from "react";
import { getCourseListByStudentId } from "../../../../api/course";
import { getID } from "../../../../utils";
import { useNavigate } from "react-router-dom";
import { formatDate } from "../../../../utils/date";

const CourseCards = () => {
	const [courseList, setCourseList] = useState([]);
	const navigate = useNavigate();

	const getCourses = async () => {
		const student_id = getID();
		try {
			const response = await getCourseListByStudentId(student_id);
			setCourseList(response);
		} catch (error) {
			if (error.response && error.response.status === 404) {
				if (student_id == undefined) {
					message.info("Please login first");
					navigate("/login");
				} else {
					message.info("No courses found");
				}
			} else {
				message.error(error.message);
			}
		}
	};

	useEffect(() => {
		getCourses();
	}, []);

	return (
		<>
			{courseList.map((course) => {
				return (
					<div key={course.course_id} style={{ margin: "10px 0" }}>
						<Card key={course.course_id}
							type="inner"
							title={course.course_id}
							style={{ width: "auto" }}
							extra={<Space key={course.course_id + "space"}>
								<a onClick={(e) => {
									e.preventDefault();
									navigate(`/homepage/request/${course.course_id}`);
								}}>Request</a>
							</Space>
							}
						>
							<Descriptions >
								<Descriptions.Item label="Course Name">{course.course_name}</Descriptions.Item>
								<Descriptions.Item label="Course Coordinator">{course.coordinator_name}</Descriptions.Item>
								<Descriptions.Item label="Due Date">{formatDate(course.due_date)}</Descriptions.Item>
							</Descriptions>
						</Card>
					</div>

				);
			})}
			{courseList.length === 0 && <Empty
				description={
					<span>
						No courses found
					</span>
				}
			/>}

		</>
	);
};

export default CourseCards;