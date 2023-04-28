import { Button, Tooltip} from "antd";
import ReturnModal from "../../Modals/ReturnModal";
import { useState } from "react";
import { CheckOutlined } from "@ant-design/icons";

const ReturnEquipment = ({record}) => {
	const [open, setOpen] = useState(false);

	const onClick = () => {		
		setOpen(true);
		console.log(record);
	};

	return (
		<>
			<Tooltip title={"Return Equipment"}>
				<Button
					size="large"
					onClick={onClick}
					icon={<CheckOutlined />}
				/>
				{record && <ReturnModal 
					open={open} 
					hideModal={() => {
						setOpen(false);
					}}
					record={record}
				/>}
			</Tooltip>
		</>
	);
};

export default ReturnEquipment;

