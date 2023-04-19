import { Form, Input } from "antd";

function NewStudentForm({ form }) {
	const studentIdValue=Form.useWatch("user_name",form);
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
			<Form.Item label="Student ID" name="user_name" rules={[{ required: true },{type:Number}]}>
				<Input placeholder={"axxxxxxx"}/>
			</Form.Item>
			<Form.Item label="Student Email"  >
				{generateStudentEmail() }
			</Form.Item>
		</Form>
	);
}

export default NewStudentForm;