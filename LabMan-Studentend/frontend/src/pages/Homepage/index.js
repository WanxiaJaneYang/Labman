import React from "react";
import { Layout, Menu, theme, Row } from "antd";
import { Outlet } from "react-router";
import "./style.css";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState} from "react";
import { FormOutlined,FolderOpenOutlined,UserOutlined } from "@ant-design/icons";

const { Header,Footer, Content } = Layout;

const Homepage = () => {
	const [selectedKey, setSelectedKey] = useState(window.location.pathname);
	const navigate = useNavigate();
	const location = useLocation();

	const getFirstTwoPathSegments = (pathname) => {
		const segments = pathname.split("/");
		return `/${segments[1]}/${segments[2]}`;
	};

	const menuItems = [
		{
			key: "/homepage/request",
			label: "Request",
			icon:<FormOutlined />
		},
		{
			key: "/homepage/return",
			label: "Return",
			icon:<FolderOpenOutlined />
		},
		{
			key: "/homepage/announcement",
			label: "User",
			icon:<UserOutlined />
		},
	];
    
	const { token: { colorBgContainer } } = theme.useToken();

	useEffect(() => {
		setSelectedKey(getFirstTwoPathSegments(location.pathname));
	}, [location]);

	return (
		<Layout className="layout" style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
			<Header style={{ padding: "0px 0px", display:"flex", height:"4%", backgroundColor:"Background" }}>
				<Row style={
					{
						marginLeft: "auto",
						marginRight: "80%",
					}
				}
				justify="start"
				/>
			</Header>
			<Content style={{ backgroundColor: colorBgContainer, flex: 1, overflow: "auto", padding:"20px"}}>
				<Outlet/>
			</Content>
			<Footer style={{ padding: "0px 0px" }}>
				<Menu
					theme="dark"
					mode="horizontal"
					selectedKeys={[selectedKey]}
					onClick={({ key }) => {
						navigate(key);
					}}
					defaultSelectedKeys={["/homepage/request"]}
					items={menuItems.map((item) => ({ ...item }))}
					style={{ width: "100%",  justifyContent: "space-around" }}
				/>
			</Footer>
		</Layout>
	);
};

export default Homepage;
