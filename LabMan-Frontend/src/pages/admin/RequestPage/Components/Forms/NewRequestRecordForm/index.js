import { Form, Input, message, Select } from "antd";
import { useEffect, useState } from "react";
import { getCourseListByStudentId } from "../../../../../../api/enrollment";
import { getPackages, getPackageById } from "../../../../../../api/package";
import { getStudentById } from "../../../../../../api/student";

function NewRequestRecordForm({ form }) {
	const[courseList, setCourseList] = useState([]);
	const[packageList, setPackageList] = useState([]);
	const course_id=Form.useWatch("course_id", form);
	const package_id=Form.useWatch("package_id", form);

	const getCourseList = async () => {
		const student_id=form.getFieldValue("student_id");
		try{
			const response = await getCourseListByStudentId(student_id);
			setCourseList(response);
		}catch(error){
			message.error(error.message);
		}
	};

	const getPackageList = async (course_id) => {
		try{
			const response = await getPackages(course_id);
			setPackageList(response);
		}catch(error){
			message.error(error.message);
		}
	};

	const getPackageDetail = async(package_id) => {
		try{
			const response = await getPackageById(package_id);
			console.log(response);
		}catch(error){
			message.error(error.message);
		}
	};

	useEffect(() => {
		const student_id=form.getFieldValue("student_id");
		if(student_id){
			getCourseList();
		}
	}, [form]);

	useEffect(() => {
		if(course_id){
			getPackageList(course_id);
		}
	}, [course_id]);

	useEffect(() => {
		if(package_id){
			getPackageDetail(package_id);
		}
	}, [package_id]);

	const validateStudentID = async(_, value) => {
		if (/^a\d{7}$/.test(value) ) {
			try{
				const response = await getStudentById(value);
				if(response){
					getCourseList();
					return Promise.resolve();
				}
			}catch(error){
				return Promise.reject(
					new Error("Student ID does not exist!")
				);
			}
		} else {
			return Promise.reject(
				new Error("Student ID must start with 'a' and followed by 7 digits")
			);
		}
	};

	return (
		<Form form={form} layout="vertical">
			<Form.Item 
				label="Student ID" 
				name="student_id" 
				rules={[
					{ required: true },
					{ validator: validateStudentID },
				]}>
				<Input />
			</Form.Item>
			<Form.Item name={"course_id"} label="Course" rules={[{ required: true }]}>
				<Select
					showSearch
					filterOption={(input, option) =>
						option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
					}
					options={courseList.map((courseList) => ({
						label: courseList.course_name,
						value: courseList.course_id,
					}))}
				/>
			</Form.Item>
			<Form.Item name={"package_id"} label="Package" rules={[{ required: true }]}>
				<Select
					showSearch
					filterOption={(input, option) =>
						option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
					}
					options={packageList.map((packageList) => ({
						label: packageList.package_name,
						value: packageList.package_id,
					}))}
				/>
			</Form.Item>
		</Form>
	);
}

export default NewRequestRecordForm;
