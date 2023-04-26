import {Modal, Form} from "antd";
import { useRequestRecordContext } from "../../../Context";
import ModifyRequestForm from "../../Forms/ModifyRequestForm";

const EditRequestModal = ({open, hideModal}) => {
	const {onEdit, equipmentTypeList, modalData} = useRequestRecordContext();
	const [form]=Form.useForm();

	const onOk=async() => {
		await form.validateFields();
		const values = form.getFieldsValue();
		values.request_id = modalData.request_id;
		values.return_date = values.return_date.format("YYYY-MM-DD HH:mm:ss");
		values.type_id = equipmentTypeList.find((type)=>type.type_name===values.type_name).type_id;
		onEdit(values);
		closeModal();
	};

	const closeModal = () => {
		hideModal();
	};

	return (
		<Modal
			title="Request Detail"
			open={open}
			onCancel={closeModal}
			onOk={onOk}
			maskStyle={{backgroundColor: "rgba(0,0,0,0.1)"}}
			destroyOnClose={true}
		>
			<ModifyRequestForm form={form}/>
		</Modal>
	);
};

export default EditRequestModal;
