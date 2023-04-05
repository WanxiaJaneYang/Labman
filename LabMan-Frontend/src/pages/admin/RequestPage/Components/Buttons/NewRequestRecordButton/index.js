import { Button } from "antd";
import {useState} from "react";
import NewRequestRecordModal from "../../Modals/NewRequestRecordModal";

const NewRequestRecordButton = () => {
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
			<NewRequestRecordModal open={isModalOpen} hideModal={hideModal}/>
		</>
	);
};

export default NewRequestRecordButton;