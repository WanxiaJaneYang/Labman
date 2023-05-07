import { Button, Modal, Form, message } from "antd";
import { useState } from "react";
import NewRequestRecordForm from "../../Forms/NewRequestRecordForm";
import { useRequestRecordContext } from "../../../Context";

const NewRequestRecordButton = () => {
	const [loading, setLoading] = useState(false);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const { onAdd, equipmentTypeList } = useRequestRecordContext();
	const showModal = () => {
		setIsModalOpen(true);
	};
	const hideModal = () => {
		form.resetFields();
		setIsModalOpen(false);
	};

	const [form] = Form.useForm();

	const adjustFormValues = async (values) => {
		values.type_id = equipmentTypeList.find(
			(type) => type.type_name === values.type_name
		).type_id;
		values.return_date = values.return_date.format("YYYY-MM-DD HH:mm:ss");

		return values;
	};

	const okHandler = async () => {
		setLoading(true);
		try {
			const values = await form.validateFields();
			const adjustedValues = await adjustFormValues(values);
			await onAdd(adjustedValues);
			hideModal();
		} catch (error) {
			message.error(error.message);
		} finally {
			setLoading(false);
		}
	};

	return (
		<>
			<Button type="primary" onClick={showModal}>
        New
			</Button>
			<Modal
				title="Add New Request Record"
				open={isModalOpen}
				onCancel={hideModal}
				onOk={okHandler}
				destroyOnClose={true}
				maskStyle={{ backgroundColor: "rgba(0,0,0,0.3)" }}
				confirmLoading={loading}
			>
				<NewRequestRecordForm form={form} />
			</Modal>
		</>
	);
};

export default NewRequestRecordButton;
