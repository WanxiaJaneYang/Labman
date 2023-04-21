import { ExclamationCircleFilled } from "@ant-design/icons";
import { Button, Modal,message } from "antd";
import { useRequestRecordContext } from "../../../RequestRecordContext";

const CollectButton = () => {
	const { confirm } = Modal;
	
	const [messageApi, contextHolder] = message.useMessage();

	const{selectedRows, onCollect}=useRequestRecordContext();

	const handleConfirm = () => {
		if (selectedRows && selectedRows.length > 0) {
			showConfirm();
		} else {
			messageApi.warning("Please select at least one row.");
			console.log("No request selected for collection");
		}
	};

	const showConfirm = () => {
		confirm({
			title: "Are you sure you want to confirm the equipment collection? ",
			icon: <ExclamationCircleFilled />,
			content: "This will update the request record to show that the equipment has been collected by the student",
			onOk() {
				onCollect();//modify this later
				console.log("OK");
			},
			onCancel() {
				console.log("Cancel");
			},
		});
	};

	return (
		<>
			{contextHolder}
			<Button type="primary" onClick={handleConfirm}>Collect</Button>
		</>
	);
};

export default CollectButton;