import { EditOutlined } from "@ant-design/icons";
import { Modal, Form, message } from "antd";
import { useState } from "react";
import EditEquipmentForm from "../../Form/EditEquipmentForm";
import { usePackageDetailContext } from "../../../Context";

const EditRecordButton = ({ record}) => {
	const [form] = Form.useForm();
	const [open, setOpen] = useState(false);
	const [loading, setLoading] = useState(false);
	const { onEdit } = usePackageDetailContext();

	const onClick = () => {
		setOpen(true);
		form.setFieldValue("type_id", record.type_id);
		form.setFieldValue("upper_bound_type_amount", record.upper_bound_type_amount);
	};

	const hideModal = () => {
		form.resetFields();
		setOpen(false);
	};

	const onOk = () => {
		setLoading(true);
		form.validateFields().then((values) => {
			onEdit(values);
			hideModal();
		}).catch((error) => {
			message.error(error.message);
			hideModal();
		});
		setLoading(false);
	};


	return (
		<>
			<EditOutlined 
				onClick={onClick}
			/>
			<Modal title="Edit Equipment And Amount"
				open={open}
				onCancel={hideModal}
				onOk={onOk}
				destroyOnClose={true}
				confirmLoading={loading}
			>
				<EditEquipmentForm record={record} form={form} />
			</Modal>
		</>
	);
};

export default EditRecordButton;