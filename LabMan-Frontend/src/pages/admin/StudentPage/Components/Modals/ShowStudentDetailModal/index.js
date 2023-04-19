import { Modal } from "antd";
import { useStudentContext } from "../../../Context/StudentContext";
function ShowStudentDetailModal() {
	const {modalData, detailModalVisible, setDetailModalVisible} = useStudentContext();

	const hideDetailModal = () => {
		setDetailModalVisible(false);
	};

	return (
		<Modal title="Student Detail" width="70vw" open={detailModalVisible} onCancel={hideDetailModal} onOk={hideDetailModal}>
			<p>Student ID: {modalData?modalData.user_name:""}</p>
			<p>Student Email: {modalData?modalData.email:""}</p>
			{/* <p>Student Password: {selectedRows?selectedRows[0].password:""}</p> */}
		</Modal>
	);
}

export default ShowStudentDetailModal;