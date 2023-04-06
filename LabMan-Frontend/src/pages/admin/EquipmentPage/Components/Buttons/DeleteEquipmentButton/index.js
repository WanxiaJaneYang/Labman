import { ExclamationCircleFilled } from "@ant-design/icons";
import { Button, Modal } from "antd";
import { useEquipmentContext } from "../../../Context";
const { confirm } = Modal;

function DeleteEquipmentButton() {
	const{selectedRow, onDelete}=useEquipmentContext();

	const handleDelete = () => {
		if (selectedRow) {
			showConfirm();
		} else {
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
		<Button type="primary" danger onClick={handleDelete}>
            Delete
		</Button>
	);
}

export default DeleteEquipmentButton;