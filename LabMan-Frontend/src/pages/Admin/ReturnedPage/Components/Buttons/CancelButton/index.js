import { CloseOutlined } from "@ant-design/icons";
import { Tooltip } from "antd";
import { useState } from "react";
import CancelReturnModal from "../Modals/CancelReturnModal";

const CancelButton = ({record}) => {
	const [open, setOpen] = useState(false);
	const onClick = () => {
		setOpen(true);
	};

	return (
		<Tooltip title={"Cancel Returned Record"}>
			<CloseOutlined 
				fontSize={20}
				onClick={onClick}
			/>
			{record && <CancelReturnModal
				title="Cancel Return"
				open={open}
				hideModal={() => {
					setOpen(false);
				}}
				data={record}
			/>}
		</Tooltip>
	);
};

export default CancelButton;