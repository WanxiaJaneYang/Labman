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
				onEdit();
				setEditModalVisible(false);
			}}
			maskStyle={{backgroundColor: "rgba(0,0,0,0.1)"}}
		>
			<ModifyRequestForm form={form}/>
		</Modal>
	);
};

export default EditRequestModal;
