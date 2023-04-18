import { ExclamationCircleFilled } from "@ant-design/icons";
import { Button, Modal } from "antd";

const { confirm } = Modal;

const ReturnEquipment = (props) => {
	const handleReturn = () => {
		if (props.selectedRow) {
			showConfirm();
		} else {
			console.log("No record selected for deletion");
		}
	};

	const showConfirm = () => {
		confirm({
			title: "Do you record this equipment as returned?",
			icon: <ExclamationCircleFilled />,
			// content: "Some descriptions",
			onOk() {
				// Call the API to delete the record from the DB
				// ...

				// After the deletion is successful, call the onDelete function (which is fetchData) to refetch the data
				props.onReturn();

				console.log("OK");
			},
			onCancel() {
				console.log("Cancel");
			},
		});
	};

	return (
		<Button type='primary' onClick={handleReturn}>Return</Button>
	);
};

export default ReturnEquipment;

