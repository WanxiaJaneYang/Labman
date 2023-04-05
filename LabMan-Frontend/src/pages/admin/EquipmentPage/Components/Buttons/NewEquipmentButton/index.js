import { Button } from "antd";
import {useState} from "react";
import NewEquipmentModal from "../../Modals/NewEquipmentModal";
const NewEquipmentButton = () => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const showModal = () => {
		setIsModalOpen(true);
	};
	const hideModal = () => {
		setIsModalOpen(false);
	};

	return (
		<>
			<Button type='primary' onClick={showModal}>New </Button>
			<NewEquipmentModal open={isModalOpen} hideModal={hideModal}/>
		</>
	);
};

export default NewEquipmentButton;