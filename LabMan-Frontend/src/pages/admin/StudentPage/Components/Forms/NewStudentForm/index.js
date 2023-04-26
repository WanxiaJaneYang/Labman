import { Form, Input } from "antd";

function NewStudentForm({ form }) {
	const studentIdValue=Form.useWatch("student_id",form);
	const generateStudentEmail=()=>{
		if(studentIdValue){
			return studentIdValue+"@adelaide.edu.au";
		}
		else{
			return "Please enter student ID first";
		}
	};
	return (
		<Form form={form} layout="vertical">
			<Form.Item label="Student ID" name="student_id" rules={[{ required: true },{type:Number}]}>
				<Input placeholder={"axxxxxxx"}/>
			</Form.Item>
			<Form.Item label="Student Email"  >
				{generateStudentEmail() }
			</Form.Item>
		</Form>
	);
}

export default NewStudentForm;