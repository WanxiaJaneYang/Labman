import { Row } from "antd";
import AnnouncementCard from "./AnnouncementCard";
import LogoutButton from "./LogoutButton";

const AnnouncementPage = () => {
	return (
		<div>
			<AnnouncementCard/>
		
			<Row justify="end" style={{marginTop:"20px"}}>
				<LogoutButton/>
			</Row>
		</div>
	);
};

export default AnnouncementPage;