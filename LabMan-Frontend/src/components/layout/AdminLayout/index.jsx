import MyLayout from "../MyLayout";
import {
	DatabaseOutlined,
	ExportOutlined,
	ImportOutlined,
} from "@ant-design/icons";
import { Outlet } from "react-router";

const adminMenuItems = [
	{
		key: "/admin/request",
		icon: <ExportOutlined />,
		label: "Request",
	},
	{
		key: "/admin/return",
		icon: <ImportOutlined />,
		label: "Return",
	},
	{
		key: "/admin/equipment",
		icon: <DatabaseOutlined />,
		label: "Equipment",
	},
];

const AdminLayout = () => {
	return (
		<MyLayout
			menuItems={adminMenuItems}
		>
			<Outlet />
		</MyLayout>
	);
};

export default AdminLayout;
