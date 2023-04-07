import {Form, Input} from "antd";
import {useStudentContext} from "../../../Context/StudentContext";
import { useEffect } from "react";

const ModifyStudentForm = ({form}) => {
	const {selectedRows} = useStudentContext();
	const studentIdValue=Form.useWatch("user_name",form);
	const generateStudentEmail=()=>{
		if(studentIdValue){
			return studentIdValue+"@adelaide.edu.au";
		}
		else if(selectedRows){
			return selectedRows[0].email;
		}else{
			return "";
		}
	};

	useEffect(() => {
		if (selectedRows) {
			form.setFieldsValue({
				user_name: selectedRows[0].user_name,
				student_email: selectedRows[0].email,
				password: selectedRows[0].password,
			});
		} else {
			form.resetFields();
		}
	}, [selectedRows, form]);

	return (
		<Form form={form} layout="vertical" >
			<Form.Item label="Student ID" name="user_name" >
				<Input/>
			</Form.Item>
			<Form.Item label="Student Email" >
				{generateStudentEmail()}
			</Form.Item>
			<Form.Item label="Student Password" name="password" >
				<Input/>
			</Form.Item>
		</Form>
	);
    
};

export default ModifyStudentForm;