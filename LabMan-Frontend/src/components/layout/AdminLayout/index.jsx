import MyLayout from "../MyLayout";
import {
    DatabaseOutlined,
    ExportOutlined,
    ImportOutlined,
} from "@ant-design/icons";
import { Outlet } from "react-router";

const adminMenuItems = [
    {
        key: "request",
        icon: <ExportOutlined />,
        label: "Request",
        link: "/admin/request",
    },
    {
        key: "return",
        icon: <ImportOutlined />,
        label: "Return",
        link: "/admin/return",
    },
    {
        key: "equipment",
        icon: <DatabaseOutlined />,
        label: "Equipment",
        link: "/admin/equipment",
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
