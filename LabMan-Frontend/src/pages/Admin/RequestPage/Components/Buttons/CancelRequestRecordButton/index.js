import { useRequestRecordContext } from "../../../Context";
import { ExclamationCircleFilled } from "@ant-design/icons";
import { Button, Modal } from "antd";
const { confirm } = Modal;

function CancelRequestRecordButton() {
	const { selectedRows, onCancel } = useRequestRecordContext();
  
	const handleCancel = () => {
		if (selectedRows && selectedRows.length > 0) {
			showConfirm();
		} else {
			console.log("No record selected for deletion");
		}
	};
  
	const showConfirm = () => {
		confirm({
			title: "Do you want to cancel the request?",
			icon: <ExclamationCircleFilled />,
			onOk() {
			// Call the API to delete the record from the server
			// ...
  
				// After the deletion is successful, call the fetchData function to refetch the data
				onCancel();
  
				console.log("OK");
			},
			onCancel() {
				console.log("Cancel");
			},
		});
	};
  
	return (
		<Button type="primary" danger onClick={handleCancel}>
		Cancel
		</Button>
	);
}
  
export default CancelRequestRecordButton;
  