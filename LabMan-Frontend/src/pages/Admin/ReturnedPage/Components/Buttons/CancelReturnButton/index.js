import { useReturnedRecordContext } from "../../../Context";
import { ExclamationCircleFilled } from "@ant-design/icons";
import { Button, Modal, message } from "antd";
const { confirm } = Modal;

function CancelAllReturnButton() {
	const { selectedRows, onCancel } = useReturnedRecordContext();
  
	const handleCancel = () => {
		if (selectedRows && selectedRows.length > 0) {
			showConfirm();
		} else {
			message.warning("Please select at least one row.");
		}
	};
  
	const showConfirm = () => {
		confirm({
			title: "Do you want to cancel the return record?",
			icon: <ExclamationCircleFilled />,
			onOk() {
				onCancel();
			},
		});
	};
  
	return (
		<Button type={"primary"} onClick={handleCancel}>
		CancelAll
		</Button>
	);
}
  
export default CancelAllReturnButton;
  