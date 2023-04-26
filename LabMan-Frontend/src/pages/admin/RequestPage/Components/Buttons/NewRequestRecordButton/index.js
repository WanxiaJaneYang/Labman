import { Button,Modal,Form, message } from "antd";
import {useState} from "react";
import NewRequestRecordForm from "../../Forms/NewRequestRecordForm";
import { useRequestRecordContext } from "../../../Context";

const NewRequestRecordButton = () => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const { onAdd, equipmentTypeList } = useRequestRecordContext();
	const showModal = () => {
		setIsModalOpen(true);
	};
	const hideModal = () => {
		setIsModalOpen(false);
	};

	const [form] = Form.useForm();

	const okHandler = async () => {
		try {
			await form.validateFields();
			const values = form.getFieldsValue();
			values.type_id = equipmentTypeList.find((type)=>type.type_name===values.type_name).type_id;
			values.return_date = values.return_date.format("YYYY-MM-DD HH:mm:ss");
			hideModal();
			await onAdd(values);
			form.resetFields();
		} catch (error) {
			message.error(error.message);
		}
	};

	return (
		<>
			<Button type='primary' onClick={showModal}>New </Button>
			<Modal
				title='Add New Request Record'
				width="80vw"
				open={isModalOpen}
				onCancel={hideModal}
				onOk={okHandler}
				destroyOnClose={true}
				maskStyle={{backgroundColor: "rgba(0,0,0,0.3)"}}
			>
				<NewRequestRecordForm form={form}/>
			</Modal>
		</>
	);
};

export default NewRequestRecordButton;