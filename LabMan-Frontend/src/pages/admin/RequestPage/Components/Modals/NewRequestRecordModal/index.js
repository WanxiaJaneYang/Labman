import { Modal, Form } from "antd";
import NewRequestRecordForm from "../../Forms/NewRequestRecordForm";
import { useRequestRecordContext } from "../../Context/RequestRecordContext";

const NewRequestRecordModal = (props) => {
	const { handleFormSubmit } = useRequestRecordContext();
	const [form] = Form.useForm();
	const okHandler = async () => {
		try {
			const values = await form.validateFields();
			await handleFormSubmit(values);
			props.hideModal();
			form.resetFields();
		} catch (error) {
			console.log("Validation failed:", error);
		}
	};

	return (
		<Modal title='Add New Request Record' width="100vw" open={props.open} onCancel={props.hideModal} onOk={okHandler}>
			<NewRequestRecordForm form={form}/>
		</Modal>
	);
};

export default NewRequestRecordModal;