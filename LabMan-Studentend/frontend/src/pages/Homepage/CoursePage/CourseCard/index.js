import { Card, Descriptions, Space, message } from "antd";
import { useEffect, useState } from "react";
import { getCourseListByStudentId } from "../../../../api/course";
import { getID } from "../../../../utils";

const CourseCards=()=>{
	const [courseList,setCourseList]=useState([]);

	const getCourses=async()=>{
		const student_id = getID();
		try{
			const response=await getCourseListByStudentId(student_id);
			setCourseList(response);
		}catch(error){
			if(error.response.status===404){
				message.info("No courses found");
			}else{
				message.error(error.message);
			}
		}
	};

	useEffect(()=>{
		getCourses();
	},[]);

	const formatDate=(date)=>{
		date = new Date(date);
		const year = date.getFullYear();
		const month = date.getMonth()+1;
		const day = date.getDate();
		return `${year}-${month}-${day}`;
	};

	return(
		<>
			<Space
				direction="vertical"
			>
				{courseList.map((course)=>{
					return(
						<Card key={course.course_id} 
							type="inner"
							title={course.course_id} 
							style={{ width: 300 }} 
							extra={<a href={`/homepage/request/${course.course_id}`}>Request</a>}
						>
							<Descriptions>
								<Descriptions.Item label="Course Name">{course.course_name}</Descriptions.Item>
								<Descriptions.Item label="Course Coordinator">{course.coordinator_name}</Descriptions.Item>
								<Descriptions.Item label="Due Date">{formatDate(course.due_date)}</Descriptions.Item>
							</Descriptions>
						</Card>
					);
				})}
			</Space>
			
		</>
	);
};

export default CourseCards;