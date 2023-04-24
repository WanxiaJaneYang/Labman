import {Modal, Form} from "antd";
import { useRequestRecordContext } from "../../../Context";
import ModifyRequestForm from "../../Forms/ModifyRequestForm";

const EditRequestModal = () => {
	const {onEdit, editModalVisible, setEditModalVisible} = useRequestRecordContext();
	const [form]=Form.useForm();

	return (
		<Modal
			title="Edit Request"
			open={editModalVisible}
			onCancel={() => setEditModalVisible(false)}
			onOk={() => {
				const values = form.getFieldsValue();
				console.log("Received values of form: ", values);
				values.return_date = values.return_date.format("YYYY-MM-DD HH:mm:ss");
				onEdit(values);
				setEditModalVisible(false);
			}}
			maskStyle={{backgroundColor: "rgba(0,0,0,0.1)"}}
		>
			<ModifyRequestForm form={form}/>
		</Modal>
	);
};

export default EditRequestModal;
