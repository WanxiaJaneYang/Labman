import { Collapse, message, Button } from "antd";
import { useEffect, useState } from "react";
import { getAnnouncement } from "../../../api/announcement";

const { Panel } = Collapse;

const GeneralSettingPage = () => {
	const [text, setText] = useState(""); 
	
	const getText = async () => {
		try{
			const response = await getAnnouncement();
			setText(response);
		}catch(error){
			message.error(error.message);
		}
	};

	useEffect(() => {
		getText();
	}, []);

	const emailNotification = () => {
		return (
			<p>Automatically sending email 8 days earlier before due date</p>
		);
	};

	return (
		<Collapse defaultActiveKey={["1"]} >
			<Panel header="Email Notification" key="1">
				{emailNotification()}
			</Panel>
			<Panel header="Announcement" key="2">
				<p>{text}</p>
				<Button>edit</Button>
			</Panel>
		</Collapse>
	);
};

export default GeneralSettingPage;