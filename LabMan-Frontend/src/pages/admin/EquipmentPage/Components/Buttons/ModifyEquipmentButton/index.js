import { Button,Modal,Form } from "antd";
import {useState} from "react";
import {useEquipmentContext} from "../../../Context";
import ModifyEquipmentForm from "../../Forms/ModifyEquipmentForm";

function ModifyEquipmentButton() {
	const [isModalOpen, setIsModalOpen] = useState(false);

	const [form] = Form.useForm();

	const {selectedRow, onModify} = useEquipmentContext();

	const onModifyClick = () => {
		if(selectedRow){
			showModal();
		}
		else{
			console.log("No Equipment selected for modification");
		}
	};

	const showModal = () => {
		setIsModalOpen(true);
	};

	const hideModal = () => {
		setIsModalOpen(false);
	};

	const okHandler = async() => {
		try {
			const values = await form.validateFields();
			console.log("Form values:", values);
			onModify();
			hideModal();
			form.resetFields();
		} catch (error) {
			console.log("Form validation failed:", error);
		}
	};



	return (
		<>
			<Button type="primary" onClick={onModifyClick} >
            Modify
			</Button>
			<Modal title="Modify Equipment" width="70vw" open={isModalOpen} onCancel={hideModal} onOk={okHandler}>
				<ModifyEquipmentForm form={form}/>
			</Modal>
		</>
		
	);
}


export default ModifyEquipmentButton;