import {Form, Button, Input} from "antd";
import {PlusOutlined, MinusCircleOutlined} from "@ant-design/icons";
import {getStudentById} from "../../../../../../api/student";

const AddStudentForm = ({form}) => {
	const studentValidator = async(_, value) => {
		if (/^a\d{7}$/.test(value) ) {
			try{
				await getStudentById(value);
                
			}catch(err){
				return Promise.reject(new Error("Student ID does not exist"));
			}
		} else {
			return Promise.reject(
				new Error("Student ID must start with 'a' and followed by 7 digits")
			);
		}
	};

	return (
		<Form form={form}>
			<Form.List name={"student_id"}>
				{(fields, {add, remove}) => {
					return (
						<>
							{fields.map((field) => (
								<Form.Item
									label={"Student ID"}
									required={false}
									key={field.key}
								>
									<Form.Item
										{...field}
										validateTrigger={["onChange", "onBlur"]}
										rules={[
											{
												required: true,
												whitespace: true,
												message: "Please input student ID or delete this field.",
											},
											{
												validator: studentValidator,
											}
										]}
										noStyle
									>
										<Input placeholder="Student ID" style={{width: "60%"}}/>
									</Form.Item>
									{fields.length > 1 ? (
										<MinusCircleOutlined
											className="dynamic-delete-button"
											onClick={() => remove(field.name)}
										/>
									) : null}
								</Form.Item>
							))}
							<Form.Item>
								<Button
									type="dashed"
									onClick={() => add()}  
									style={{width: "60%"}}
									icon={<PlusOutlined/>}
								>
                                    Add Student
								</Button>
							</Form.Item>
						</>
					);
				}}
			</Form.List>            
		</Form>
	);
};

export default AddStudentForm;