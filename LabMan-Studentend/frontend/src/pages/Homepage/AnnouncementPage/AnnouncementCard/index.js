import {Card, message} from "antd";
import { getAnnouncement } from "../../../../api/announcement";
import { useEffect, useState } from "react";

const AnnouncementCard = () => {
	const [text, setText] = useState("");

	const getAnnouncements = async () => {
		try {
			const response = await getAnnouncement();
			setText(response.announcement);
		} catch (error) {
			message.error(error.message);
		}
	};

	useEffect(() => {
		getAnnouncements();
	}, []);

	return (
		<Card title={"Announcement"} 
			type="inner"
			style={{ width: "auto" }} >
			<p>{text}</p>
		</Card>
	);
};

export default AnnouncementCard;