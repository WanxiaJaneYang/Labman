import {Modal, Form, Checkbox, Row} from "antd";
import { useRequestRecordContext } from "../../../Context";
import ModifyRequestForm from "../../Forms/ModifyRequestForm";
import { useState } from "react";

const EditRequestModal = ({open, hideModal}) => {
	const {onEdit, equipmentTypeList, modalData} = useRequestRecordContext();
	const [form]=Form.useForm();
	const [disabled, setDisabled] = useState(true);

	const onOk=async() => {
		if(!disabled) {
			await form.validateFields();
			const values = form.getFieldsValue();
			values.request_id = modalData.request_id;
			values.return_date = values.return_date.format("YYYY-MM-DD HH:mm:ss");
			values.type_id = equipmentTypeList.find((type)=>type.type_name===values.type_name).type_id;
			onEdit(values);
		}
		closeModal();
	};

	const closeModal = () => {
		setDisabled(true);
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
			<Row justify="end">
				<Checkbox
					onChange={(e) => {
						setDisabled(!e.target.checked);
					}}
				>
				Allow Edit
				</Checkbox>
			</Row>
			<ModifyRequestForm form={form} disabled={disabled}/>
		</Modal>
	);
};

export default EditRequestModal;
