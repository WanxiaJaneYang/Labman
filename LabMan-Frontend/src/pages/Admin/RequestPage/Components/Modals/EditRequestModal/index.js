import {Modal, Form} from "antd";
import { useRequestRecordContext } from "../../../Context";
import ModifyRequestForm from "../../Forms/ModifyRequestForm";

const EditRequestModal = () => {
	const {onEdit, editModalVisible, setEditModalVisible, equipmentTypeList} = useRequestRecordContext();
	const [form]=Form.useForm();

	return (
		<Modal
			title="Edit Request"
			open={editModalVisible}
			onCancel={() => setEditModalVisible(false)}
			onOk={async() => {
				await form.validateFields();
				const values = form.getFieldsValue();
				values.return_date = values.return_date.format("YYYY-MM-DD HH:mm:ss");
				values.type_id = equipmentTypeList.find((type)=>type.type_name===values.type_name).type_id;
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
