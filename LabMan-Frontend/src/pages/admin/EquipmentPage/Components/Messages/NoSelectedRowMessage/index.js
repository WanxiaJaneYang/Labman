import {Message} from "antd";

const NoSelectedRowMessage = () => {
	return (
		<Message
			type="warning"
			description="Please select a row."
		/>
	);
};

export default NoSelectedRowMessage;
