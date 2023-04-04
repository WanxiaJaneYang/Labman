import { Button } from "antd";

const NewEquipmentButton = ({ onClick }) => {
	return (
		<Button type='primary' onClick={onClick}>New </Button>
	);
};

export default NewEquipmentButton;