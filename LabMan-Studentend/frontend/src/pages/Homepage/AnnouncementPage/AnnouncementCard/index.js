import {Card} from "antd";

const AnnouncementCard = ({announcement}) => {
	return (
		<Card title={announcement.title} style={{ width: 300 }}>
			<p>{announcement.content}</p>
		</Card>
	);
};

export default AnnouncementCard;