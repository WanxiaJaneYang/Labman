import { Button, Modal } from "antd";
import { useStudentContext } from "../../../Context/StudentContext";
function ShowStudentDetailModal() {
	const {modalData, detailModalVisible, setDetailModalVisible} = useStudentContext();

	const hideDetailModal = () => {
		setDetailModalVisible(false);
	};

	return (
		<Modal 
			title="Student Detail" 
			open={detailModalVisible} 
			onCancel={hideDetailModal}
			closable={false}
			footer={[
				<Button key="ok" type="primary" onClick={hideDetailModal}>OK</Button>,
			]
			} 
			maskStyle={{ backgroundColor: "rgba(0, 0, 0, 0.1)" }}
		>
			<p>Student ID: {modalData?modalData.student_id:""}</p>
			<p>Student Email: {modalData?modalData.email:""}</p>
			{/* <p>Student Password: {selectedRows?selectedRows[0].password:""}</p> */}
		</Modal>
	);
}

export default ShowStudentDetailModal;