import { Modal } from "antd";

const ShowDetailModal = (props) => {
	const okHandler = () => {
		// call the API to get the details of the selected request record here
		props.hideModal();
	};

	return (
		<Modal title='Request Details' width="70vw" open={props.open} onCancel={props.hideModal} onOk={okHandler} selectedRow={props.selectedRow}></Modal>
	);
};

export default ShowDetailModal;