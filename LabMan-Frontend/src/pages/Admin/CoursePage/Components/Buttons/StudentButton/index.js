import {TeamOutlined} from "@ant-design/icons";
import { Tooltip } from "antd";

const StudentButton = ({course_id}) => {
	const onClick = () => {
		console.log("course_id:", course_id);
	};
    
	return(
		<>
			<Tooltip title={"Enrolled students"}>
				<TeamOutlined
					style={{fontSize: "20px"}}
					onClick={onClick}
				/>
			</Tooltip>
		</>
	);
};

export default StudentButton;