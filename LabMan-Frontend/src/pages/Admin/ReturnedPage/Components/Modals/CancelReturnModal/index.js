import {Modal, Form, InputNumber} from "antd";
import {useState} from "react";
import {onCancel} from "../../../Context";

const CancelReturnModal = ({open, hideModal, data}) => {
	const [form] = Form.useForm();
	const [confirmLoading, setConfirmLoading] = useState(false);
    
	const onOk = async () => {
		setConfirmLoading(true);
		const values = await form.validateFields();
		values.borrow_id = data.borrow_id;
		await onCancel(values);
		setConfirmLoading(false);
		hideModal();
		form.resetFields();
	};

	return (
		<Modal
			title="Cancel Return"
			open={open}
			onCancel={hideModal}
			footer={null}
			confirmLoading={confirmLoading}
			destroyOnClose={true}
			onOk={onOk}
		>
			<Form
				form={form}
			>
				<Form.Item
					label={"Return Amount"}
					name={"return_amount"}
					rules={[
						{
							required: true,
							message: "Please input the amount of equipment returned",
						},
						{
							type: "number",
							min: 1,
							max: data.returned_amount,
							message: `Please input a number between 1 and ${data.returned_amount}(returned amount))`,
						},
					]}
				>
					<InputNumber />
				</Form.Item>
			</Form>            
		</Modal>
	);
};

export default CancelReturnModal;