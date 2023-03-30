import React from "react";
import MyLayout from "./MyLayout";
import {
    DatabaseOutlined,
    ExportOutlined,
    ImportOutlined,
} from "@ant-design/icons";

const adminMenuItems = [
    {
        key: "1",
        icon: <ExportOutlined />,
        label: "Request",
        link: "/admin/request",
    },
    {
        key: "2",
        icon: <ImportOutlined />,
        label: "Return",
        link: "/admin/return",
    },
    {
        key: "3",
        icon: <DatabaseOutlined />,
        label: "Equipment",
        link: "/admin/equipment",
    },
];

const AdminLayout = ({ defaultSelectedKeys = "1", children }) => {
    return (
        <MyLayout
            defaultSelectedKeys={defaultSelectedKeys}
            menuItems={adminMenuItems}
        >
            {children}
        </MyLayout>
    );
};

export default AdminLayout;
