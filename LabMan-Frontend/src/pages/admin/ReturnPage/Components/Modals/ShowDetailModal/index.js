import { Modal } from "antd";
import { useReturnRecordContext } from "../../../ReturnRecordContext";

const ShowDetailModal = () => {
	const { modalVisible, setModalVisible , modalData} = useReturnRecordContext();

	const hideModal = () => {
		setModalVisible(false);
	};

	const formatDate = (date) => {
		return date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
	};

	return (
		<Modal 
			title='Borrow Record Details' 
			width="70vw" 
			open= {modalVisible}
			onCancel={hideModal} 
			onOk={hideModal} 
			maskStyle={{backgroundColor: "rgba(0,0,0,0.3)"}}
		>
			<p>Borrow Date: {modalData.borrow_date}</p>
			<p>Due Date: {formatDate(modalData.return_date)}</p>
			<p>Student ID: {modalData.student_id}</p>
			<p>Equipment Name: {modalData.type_name}</p>
			<p>Amount: {modalData.borrow_amount}</p>
			<p>Status: {modalData.status==0? "To Return":"Returned"}</p>
			<p style={
				modalData.status==0?{display:"none"}:{display:"block"}
			}>Actual Return Date:{formatDate(modalData.actual_return_date)}</p>
		</Modal>
	);
};

export default ShowDetailModal;