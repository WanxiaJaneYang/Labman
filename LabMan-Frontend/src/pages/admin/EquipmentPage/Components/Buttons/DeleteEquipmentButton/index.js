import { ExclamationCircleFilled } from "@ant-design/icons";
import { Button, Modal,message } from "antd";
import { useEquipmentContext } from "../../../Context";
const { confirm } = Modal;

function DeleteEquipmentButton() {
	const [messageApi, contextHolder] = message.useMessage();

	const{selectedRows, onDelete}=useEquipmentContext();

	const handleDelete = () => {
		if (selectedRows) {
			showConfirm();
		} else {
			messageApi.warning("Please select a row.");
			console.log("No Equipment selected for deletion");
		}
	};

	const showConfirm = () => {
		confirm({
			title: "Do you Want to delete the Equipment?",
			icon: <ExclamationCircleFilled />,
			// content: "Some descriptions",
			onOk() {
				onDelete();
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
			<Button type="primary" danger onClick={handleDelete}>
            Delete
			</Button>
		</>
		
	);
}

export default DeleteEquipmentButton;