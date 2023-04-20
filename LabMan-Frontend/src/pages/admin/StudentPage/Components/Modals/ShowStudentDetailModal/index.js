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
			width="70vw" 
			open={detailModalVisible} 
			footer={[
				<Button key="ok" type="primary" onClick={hideDetailModal}>OK</Button>,
			]
			} >
			<p>Student ID: {modalData?modalData.student_id:""}</p>
			<p>Student Email: {modalData?modalData.email:""}</p>
			{/* <p>Student Password: {selectedRows?selectedRows[0].password:""}</p> */}
		</Modal>
	);
}

export default ShowStudentDetailModal;