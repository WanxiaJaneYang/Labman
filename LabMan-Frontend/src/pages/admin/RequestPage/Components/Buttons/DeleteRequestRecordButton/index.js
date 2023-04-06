import { useRequestRecordContext } from "../../../Context";
import { ExclamationCircleFilled } from "@ant-design/icons";
import { Button, Modal } from "antd";
const { confirm } = Modal;

function DeleteRequestRecordButton() {
	const { selectedRow, fetchData } = useRequestRecordContext();
  
	const handleDelete = () => {
		if (selectedRow) {
			showConfirm();
		} else {
			console.log("No record selected for deletion");
		}
	};
  
	const showConfirm = () => {
		confirm({
			title: "Do you Want to delete the Record?",
			icon: <ExclamationCircleFilled />,
			onOk() {
			// Call the API to delete the record from the server
			// ...
  
				// After the deletion is successful, call the fetchData function to refetch the data
				fetchData();
  
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
  
export default DeleteRequestRecordButton;
  