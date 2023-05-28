import { useAuth } from "../../Context/AuthContext";
import { UserOutlined, LogoutOutlined,BarsOutlined } from "@ant-design/icons";
import { Avatar, Space } from "antd";

const StudentEndSider = ({closeSider}) => {
	const { logout } = useAuth();
	// const student_id = localStorage.getItem("student_id");

	return (
		<>
			<Space direction="vertical" align="center">
				<BarsOutlined onClick={closeSider}/>
				<Avatar size="large" icon={UserOutlined}/>
				{/* <p>{student_id}</p> */}
				<LogoutOutlined onClick={logout} style={{cursor: "pointer"}}/>
			</Space>
		</>
	);
};

export default StudentEndSider;