import { Modal,Form,InputNumber } from "antd";
import { useReturnRecordContext } from "../../../ReturnRecordContext";
import { useState } from "react";

const ReturnModal =({open, hideModal, record})=>{
	const {onReturnEquipment}=useReturnRecordContext();
	const [confirmLoading, setConfirmLoading] = useState(false);
	const [form] = Form.useForm();

	const onOk = async() => {
		setConfirmLoading(true);
		await form.validateFields();
		const values = await form.getFieldsValue();
		values.borrow_id=record.borrow_id;
		await onReturnEquipment(values);
		setConfirmLoading(false);
		hideModal();
	};

	const getUnreturnedAmount = () => {
		return record.borrow_amount - record.returned_amount;
	};

	return(
		<Modal 
			title={"Return Equipment"}
			open={open}
			onCancel={hideModal}
			onOk={onOk}
			confirmLoading={confirmLoading}
		>
			<Form>
				<Form.Item 
					label={"Returned Amount"} 
					name={"returned_amount"}
					rules={[
						{
							required:true,
							message:"Please input the amount of equipment returned"
						},
						{
							type:"number",
							min:1,
							max:getUnreturnedAmount(),
							message:`Please input a number between 1 and ${getUnreturnedAmount()}(remaining amount))`
						}
					]}
				>
					<InputNumber/>
				</Form.Item>
			</Form>
		</Modal>
	);
};

export default ReturnModal;