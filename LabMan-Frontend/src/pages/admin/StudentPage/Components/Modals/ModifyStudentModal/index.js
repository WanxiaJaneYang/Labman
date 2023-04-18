import { Modal,Form } from "antd";
import { useStudentContext } from "../../../Context/StudentContext";
import ModifyStudentForm from "../../Forms/ModifyStudentForm";

function ModifyStudentModal() {
	const { modifyModalVisible,
		setModifyModalVisible,
		modalData,
		setModalData,
		onModify} = useStudentContext();

	const [form] = Form.useForm();

	const hideModifyModal = () => {
		setModifyModalVisible(false);
		setModalData(null);
	};

	const handleModify = async() => {
		try {
			const values = await form.validateFields();
			console.log("Form values:", values);
			values.user_id=modalData.user_id;
			onModify(values);
			hideModifyModal();
			form.resetFields();
		} catch (error) {
			console.log("Form validation failed:", error);
		}
	};

	return (
		<Modal title="Modify Student" width="70vw" open={modifyModalVisible} onCancel={hideModifyModal} onOk={handleModify}>
			<ModifyStudentForm form={form}/>
		</Modal>
	);
}

export default ModifyStudentModal;