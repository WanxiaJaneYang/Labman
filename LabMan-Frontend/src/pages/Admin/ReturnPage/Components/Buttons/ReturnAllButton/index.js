import { ExclamationCircleFilled } from "@ant-design/icons";
import { Button, Modal, message } from "antd";
import { useReturnRecordContext } from "../../../ReturnRecordContext";

const { confirm } = Modal;

const ReturnEquipment = () => {
	const {selectedRows, onReturnAllEquipment}= useReturnRecordContext();

	const onClick = () => {
		if (selectedRows && selectedRows.length >0) {
			showConfirm();
		} else {
			message.error("Please select at least one record to return");
		}
	};

	const showConfirm = () => {
		confirm({
			title: "Do you record these as all returned?",
			icon: <ExclamationCircleFilled />,
			onOk() {
				onReturnAllEquipment();
			}
		});
	};

	return (
		<Button type='primary' onClick={onClick}>Return All</Button>
	);
};

export default ReturnEquipment;

