import { useRequestRecordContext } from "../../../Context";
import { ExclamationCircleFilled } from "@ant-design/icons";
import { Button, Modal, message } from "antd";
const { confirm } = Modal;

function CancelRequestRecordButton() {
	const { selectedRows, onCancelRequest } = useRequestRecordContext();
  
	const handleCancel = () => {
		if (selectedRows && selectedRows.length > 0) {
			showConfirm();
		} else {
			message.warning("Please select at least one row.");
		}
	};
  
	const showConfirm = () => {
		confirm({
			title: "Do you want to cancel the request?",
			icon: <ExclamationCircleFilled />,
			onOk() {
				onCancelRequest();
			},
		});
	};
  
	return (
		<Button onClick={handleCancel}>
		Cancel
		</Button>
	);
}
  
export default CancelRequestRecordButton;
  