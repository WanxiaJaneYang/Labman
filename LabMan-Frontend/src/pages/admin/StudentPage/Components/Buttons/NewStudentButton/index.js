import { Button,Modal,Form } from "antd";
import {useState} from "react";
import {useStudentContext} from "../../../Context/StudentContext";
import NewStudentForm from "../../Forms/NewStudentForm";

const NewStudentButton = () => {
	const{onAdd}=useStudentContext();

	const [isModalOpen, setIsModalOpen] = useState(false);

	const [form] = Form.useForm();

	const showModal = () => {
		setIsModalOpen(true);
	};

	const hideModal = () => {
		setIsModalOpen(false);
	};

	const okHandler = async() => {
		try {
			const values = await form.validateFields();
			values.email=values.user_name+"@adelaide.edu.au";
			console.log("Form values:", values);
			onAdd(values);
			// call the API to create a new request record here
			hideModal();
			form.resetFields();
		} catch (error) {
			console.log("Form validation failed:", error);
		}
	};

	return (
		<>
			<Button type='primary' onClick={showModal}>New </Button>
			<Modal title='Add New Equipment' width="70vw" open={isModalOpen} onCancel={hideModal} onOk={okHandler}>
				<NewStudentForm form={form}/>
			</Modal>
		</>
	);
};

export default NewStudentButton;