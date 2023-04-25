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
			const values = form.getFieldsValue();
			values.return_date = values.return_date.format("YYYY-MM-DD HH:mm:ss");
			values.type_name=equipmentTypeList.find((item)=>item.type_id===values.type_id).type_name;
			await onAdd(values);
			hideModal();
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