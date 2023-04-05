import { Modal } from "antd";
import NewEquipmentForm from "../../Forms/NewEquipmentForm";

const NewEquipmentModal = (props) => {
	const okHandler = () => {
		// call the API to create a new request record here
		props.hideModal();
	};

	return (
		<Modal title='Add New Equipment' width="70vw" open={props.open} onCancel={props.hideModal} onOk={okHandler}>
			<NewEquipmentForm />
		</Modal>

	);
};

export default NewEquipmentModal;