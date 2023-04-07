import { ExclamationCircleFilled } from "@ant-design/icons";
import { Button, Modal,message } from "antd";
import { useStudentContext } from "../../../Context/StudentContext";
const { confirm } = Modal;

function DeleteStudentButton() {
	const [messageApi, contextHolder] = message.useMessage();

	const{selectedRows, onDelete}=useStudentContext();

	const handleDelete = () => {
		if (selectedRows) {
			showConfirm();
		} else {
			messageApi.warning("Please select at least row.");
			console.log("No Student selected for deletion");
		}
	};

	const showConfirm = () => {
		confirm({
			title: "Do you Want to delete the Student(s)?",
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

export default DeleteStudentButton;