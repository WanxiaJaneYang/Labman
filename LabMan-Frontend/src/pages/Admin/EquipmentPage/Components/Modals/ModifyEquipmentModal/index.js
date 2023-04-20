import { Modal,Form } from "antd";
import { useEquipmentContext } from "../../../Context";
import ModifyEquipmentForm from "../../Forms/ModifyEquipmentForm";

function ModifyEquipmentModal() {
	const { modifyModalVisible,
		setModifyModalVisible,
		modalData,
		setModalData,
		onModify} = useEquipmentContext();

	const [form] = Form.useForm();

	const hideModifyModal = () => {
		setModifyModalVisible(false);
		setModalData(null);
	};

	const handleModify = async() => {
		try {
			const values = form.getFieldsValue();
			console.log("Form values:", values);
			values.type_id=modalData.type_id;
			onModify(values);
			hideModifyModal();
			form.resetFields();
		} catch (error) {
			console.log("Form validation failed:", error);
		}
	};

	return (
		<Modal
			title="Modify Equipment" 
			width="70vw" 
			open={modifyModalVisible} 
			onCancel={hideModifyModal} 
			onOk={handleModify}
			maskStyle={{backgroundColor:"rgba(0,0,0,0.1)"}}
		>
			<ModifyEquipmentForm form={form}/>
		</Modal>
	);
}

export default ModifyEquipmentModal;