import {DatePicker, Form, Input} from "antd";
import { getCourseById, getCourseByCoursenameAndCoordinator } from "../../../../../../api/course";
import moment from "moment";

const NewCourseForm = ({ form}) => {
	const courseCodeValidator = (_, value) => {
		getCourseById(value).then(() => {
			return Promise.reject("Course code already exists.");
		}).catch(() => {
			return Promise.resolve();
		});
	};

	const courseNameValidator = (_, value) => {
		getCourseByCoursenameAndCoordinator(value,"").then(() => {
			return Promise.reject("Course name already exists.");
		}).catch(() => {
			return Promise.resolve();
		}
		);
	};

	return(
		<>
			<Form form={form}>
				<Form.Item label="Course Code" name="course_id" rules={
					[
						{
							required: true,
							message: "Please input course code.",
						},
						{
							validator:courseCodeValidator,
						}
					]
				}>
					<Input />
				</Form.Item>
				<Form.Item label="Course Title" name="course_name" rules={
					[
						{
							required: true,
							message: "Please input course title.",
						},
						{
							validator:courseNameValidator,
						}
					]
				}>
					<Input />
				</Form.Item>
				<Form.Item label="Course Coordinator" name="course_coordinator">
					<Input />
				</Form.Item>
				<Form.Item label="Equipment Return Date" name="due_date"
					rules={
						[
							{
								required: true,
								message: "Please input return date.",
							},
						]
					}
				>
					<DatePicker 
						allowClear
						disabledDate={(current) => {
							return current && current < moment().endOf("day");
						}}
					/>
				</Form.Item>
			</Form>
		</>
	);
};

export default NewCourseForm;