import { ExclamationCircleFilled } from "@ant-design/icons";
import { Button, Modal, message } from "antd";
import { useReturnRecordContext } from "../../../ReturnRecordContext";

const { confirm } = Modal;

const ReturnEquipment = () => {
	const {selectedRows, onReturnEquipment}= useReturnRecordContext();

	const onClick = () => {
		if (selectedRows && selectedRows.length >0) {
			showConfirm();
		} else {
			message.error("Please select at least one record to return");
		}
	};

	const showConfirm = () => {
		confirm({
			title: "Do you record this equipment as returned?",
			icon: <ExclamationCircleFilled />,
			// content: "Some descriptions",
			onOk() {
				onReturnEquipment();
			}
		});
	};

	return (
		<Button type='primary' onClick={onClick}>Return</Button>
	);
};

export default ReturnEquipment;

