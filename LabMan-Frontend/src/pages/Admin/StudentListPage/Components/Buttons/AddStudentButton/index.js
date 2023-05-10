import { Button, Modal, Form } from "antd";
import AddStudentForm from "../../Forms/AddStudentForm";
import { useState } from "react";

const AddStudentButton = () => {
	const [form] = Form.useForm();
	const [open, setOpen] = useState(false);
	const [confirmLoading, setConfirmLoading] = useState(false);
	const onClick = () => {
		setOpen(true);
	};
	const hideModal = () => {
		form.resetFields();
		setOpen(false);
	};

	const handleOk = async () =>{
		const data=await form.validateFields();
		setConfirmLoading(true);
		console.log(data);
		setConfirmLoading(false);
		hideModal();
	};

	return (
		<>
			<Button type="primary" onClick={onClick}>
                Add
			</Button>
			<Modal 
				title={"Add Student"}
				destroyOnClose={true}
				open={open}
				onOk={handleOk}
				onCancel={hideModal}
				confirmLoading={confirmLoading}
			>
				<AddStudentForm form={form}/>
			</Modal>
		</>
	);
};

export default AddStudentButton;